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
import keras
import tensorflow as tf
import json
TEMP_PATH = "temp_storage/"

dotenv_path = os.path.join(os.path.dirname(__file__), '../../', '.env')
load_dotenv(dotenv_path)



def load_model():
    input_shape = (256, 256, 3)

    bmodel = InceptionV3(weights="imagenet", input_shape=input_shape, include_top=False)
    bmodel.trainable = False
    model = Sequential()
    model.add(bmodel)
    model.add(GlobalAveragePooling2D())
    model.add(Dense(64, activation="relu"))
    model.add(Dropout(0.3))
    model.add(Dense(36, activation='softmax'))
    model.summary()
    model.load_weights("model/temp_model.hdf5")
    return model

def load_classes():
    classes = []
    with open("classes.json", "r") as f:
        classes = json.load(f)
    return classes
model = load_model()
classes = load_classes()

def predict(img):
    img = tf.convert_to_tensor(img)
    img_tensor = tf.expand_dims(img, 0)
    pred =  model.predict(img_tensor)
    max_indx = 0
    max_val = 0
    for i, val in enumerate(pred[0]):
        if val > max_val:
            max_val = val
            max_indx = i
    print(classes[max_indx])
    return [classes[max_indx]]



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
    #return basic data for now


    #parse image
    ##PARSE STEPS
    imgBytes = request.get_data()
    nparr = np.fromstring(imgBytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    # img = []
    # temp_file = NamedTemporaryFile(suffix=".jpeg")
    # temp_file.write(imgBytes)
    # temp_file.flush()
    # img = cv2.imread(temp_file.name)
    # temp_file.close()
    # print(img, flush=True)
    # with open(NamedTemporaryFile(), 'wb') as f:
    #     f.write(imgBytes)
    #     img = cv2.imread(f.name)
        
        
    img = cv2.resize(img, (256, 256))
    # img = tf.expand_dims(img, 0)


    # return jsonify({"ingredients" : ["apple", "banana", "ground beef", "scallions"]})
    ##get classes
    rclasses = predict(img)
    return jsonify({"ingredients": rclasses})




if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9000, debug=True)
    print("PATH",dotenv_path)