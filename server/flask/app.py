from flask import Flask, request, jsonify
from tempfile import NamedTemporaryFile
import cv2
import numpy as np
from werkzeug.utils import secure_filename
import psycopg2
from psycopg2 import OperationalError
import os
from dotenv import load_dotenv
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from tensorflow.keras.applications import InceptionV3
from tensorflow.keras import layers 
from tensorflow.keras.layers import Dense, Activation, Dropout, Conv2D, MaxPool2D, GlobalAveragePooling2D
from tensorflow.keras.models import Sequential
from inference_sdk import InferenceHTTPClient, InferenceConfiguration
import keras
import tensorflow as tf
import json
dotenv_path = os.path.join(os.path.dirname(__file__), './', '.env')
load_dotenv(dotenv_path)



def load_model():
    cli = InferenceHTTPClient(
        api_url=os.getenv('FLOW_URL'),
        api_key=os.getenv('FLOW_KEY')
    )
    config = InferenceConfiguration(confidence_threshold=0.1)
    cli.configure(config)



    input_shape = (100, 100, 3)

    ##INCEPTION
    bmodel = InceptionV3(weights="imagenet", input_shape=input_shape, include_top=False)
    bmodel.trainable = False
    model = Sequential()
    model.add(bmodel)
    model.add(GlobalAveragePooling2D())
    model.add(Dense(64, activation="relu"))
    model.add(Dropout(0.3))
    model.add(Dense(53, activation='softmax'))
    model.summary()
    model.load_weights("model/model_360.hdf5")

    return (cli, model)

def load_classes():
    classes = []
    with open("360_classes.json", "r") as f:
        classes = json.load(f)
    return classes


detector, model = load_model()
classes = load_classes()

def classify(img):
    
    nimg = tf.convert_to_tensor(img, dtype=tf.float32)
    nimg /= 255
    img_tensor = tf.expand_dims(nimg, 0)
    pred =  model.predict(img_tensor)
    return classes[np.argmax(pred[0])]



app = Flask(__name__)

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv('PSQL_HOST'),
            database=os.getenv('PSQL_DATABASE'),
            user=os.getenv('PSQL_USER'),
            password=os.getenv('PSQL_PASSWORD'))
        return conn
    except OperationalError as e:
        print(f"Connection error: {e}")
        return None

# def fetch_users(username):
#     conn = get_db_connection()
#     if conn is not None:
#         try:
#             cursor = conn.cursor()
#             cursor.execute('SELECT * FROM users WHERE username = %s;', (username,))
#             users = cursor.fetchall()
#             cursor.close()
#             conn.close()
#             return users
#         except psycopg2.Error as e:
#             print(f"Error fetching users: {e}")
#             return None
#     else:
#         return None

def fetch_recipes():
    conn = get_db_connection()
    if conn is not None:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM recipes;")
            recipes = cursor.fetchall()
            cursor.close()
            conn.close()
            return recipes
        except psycopg2.Error as e:
            print(f"Error fetching users: {e}")
            return None
    else:
        return None


@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/recommend", methods=["POST"])
def get_data():
    data = request.json

    cook_time = data['cookTime']
    max_missing_ingredients = data['missing']
    user = [] if 'userjson' not in data else data['userjson']

    user_ingredients = data['ingredients']
    user_ingredients = str(user_ingredients)
    print(user)

    # s_ingredients = data['ingredients']
    # print(s_ingredients)
    # try:
    #     data = request.get_json()
    #     if not data:
    #         return jsonify({'error: no JSON recieved'}), 400
        
    #     cookTime = data.get('cookTime')
    #     print("COOKTIME", cookTime)

    #     return jsonify({'message': cookTime }), 200 
    
    # except Exception as e:
    #     return jsonify({'error': str(e)}), 400
    
    recipes = fetch_recipes()

    #Filter based on diet restrictions & Preference
    
    #Vegetarian
    if user != []:
        if(user[3]):
            recipes = [recipe for recipe in recipes if recipe[5]]
        #Vegan
        if(user[4]):
            recipes = [recipe for recipe in recipes if recipe[4]]
        #halal
        if(user[5]):
            recipes = [recipe for recipe in recipes if recipe[8]]
        #Kosher
        if(user[6]):
            recipes = [recipe for recipe in recipes if recipe[9]]
        #Lactose
        if(user[7]):
            recipes = [recipe for recipe in recipes if recipe[6]]
        #Gluten
        if(user[8]):
            recipes = [recipe for recipe in recipes if recipe[7]]
        #Nut
        if(user[9]):
            recipes = [recipe for recipe in recipes if recipe[10]]
        #Shellfish
        if(user[10]):
            recipes = [recipe for recipe in recipes if recipe[11]]
        #Pescatarian
        if(user[11]):
            recipes = [recipe for recipe in recipes if recipe[12]]
   
    #Filter based on Cook time
    recipes = [recipe for recipe in recipes if recipe[13] <= int(cook_time)]

    # user_ingredients = "sugar butter milk vanilla nuts flour"
    user_ingredient_list = user_ingredients.split()

    #Filter based on # of missing ingredients
    filtered_recipes = []
    for recipe in recipes:
        recipe_ingredients = recipe[3].split(';')  
        missing_ingredients = sum(1 for ingredient in recipe_ingredients if ingredient not in user_ingredient_list)
        if missing_ingredients <= int(max_missing_ingredients):
            filtered_recipes.append(recipe)
    
    #recommendation system(tfidf, cosine sim)
            
    tfidf = TfidfVectorizer()

    vocab = []
    for ingredients in [filtered_recipes[3] for filtered_recipes in filtered_recipes]:
        ingredients = ingredients.replace(";", " ")
        vocab.append(ingredients)

    if(len(vocab) == 0):
        return []
    
    doctfidf = tfidf.fit_transform(vocab)
    querytfidf = tfidf.fit(vocab)
    querytfidf = querytfidf.transform([user_ingredients])

    cosineSimilarities = cosine_similarity(querytfidf, doctfidf).flatten()
       
   
    zipped_recipes = list(zip(filtered_recipes, cosineSimilarities))
    sorted_recipes = sorted(zipped_recipes, key=lambda x: x[1], reverse=True)
    sorted_recipes = [filtered_recipes[0] for filtered_recipes in sorted_recipes]

    num_recipes = 20
    limited_recipes = sorted_recipes[:num_recipes]


    desired_fields = {0 : "id", 1 : "title", 2 : "link", 3 : "ingredients", 13 :"cook_time"}
    

    filtered_data = [{desired_fields[key]: recipe[key] for key in desired_fields} for recipe in limited_recipes]

    for i in range(num_recipes):
        filtered_data[i]["id"] = str(filtered_data[i]["id"])
        filtered_data[i]["cook_time"] = str(filtered_data[i]["cook_time"])
        filtered_data[i]["ingredients"] = filtered_data[i]["ingredients"].split(";")
    print(filtered_data)    
    #return recipes
    
    return filtered_data

@app.route("/detect", methods=["POST"])
def run_model():

    ##PARSE STEPS
    imgBytes = request.get_data()
    nparr = np.fromstring(imgBytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    result = detector.infer(img, model_id=os.getenv("FLOW_MODEL_ID"))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    classes = set()
    for pred in result["predictions"]:
        if pred['confidence'] > 0.90:
            classes.add(pred['class'])
            continue
        x = int(pred['x'] - (pred['width'] / 2))
        y = int(pred['y'] - (pred['height'] / 2))
        xi = int(x + pred['width'])
        yi = int(y + pred['height'])
        crimg  = img[y:yi, x:xi]
        crimg = cv2.resize(crimg, (100, 100))
        classes.add(classify(crimg))
        
    ##get classes
    return jsonify({"ingredients": list(classes)})




if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9000, debug=True)
    print("PATH",dotenv_path)