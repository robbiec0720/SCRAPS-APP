from flask import Flask, request, jsonify
import psycopg2
from psycopg2 import OperationalError
import os
from dotenv import load_dotenv
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()

app = Flask(__name__)

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv('HOST'),
            database=os.getenv('DATABASE'),
            user=os.getenv('USER'),
            password=os.getenv('PASSWORD'))
        return conn
    except OperationalError as e:
        print(f"Connection error: {e}")
        return None

def fetch_users(username):
    conn = get_db_connection()
    if conn is not None:
        try:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE username = %s;', (username,))
            users = cursor.fetchall()
            cursor.close()
            conn.close()
            return users
        except psycopg2.Error as e:
            print(f"Error fetching users: {e}")
            return None
    else:
        return None

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
    # data = request.json
    # cuisine_type = data['cuisineType']
    # cook_time = data['cookTime']
    # missing_ingredients = data['missingIngredients']
    # is_starred = data['isStarred']
    # s_ingredients = data['ingredients']
    # print(s_ingredients)
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error: no JSON recieved'}), 400
        
        cookTime = data.get('cookTime')
        print("COOKTIME", cookTime)

        return jsonify({'message': cookTime }), 200 
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
    username = request.form.get("username")
    username = 'apple'
    users = fetch_users(username)
    recipes = fetch_recipes()

    #Filter based on diet restrictions & Preference
    max_cook_time = 0
    max_missing_ingredients = 0

    user = users[0]
    #Vegetarian
    if(user[2] == True):
        recipes = [recipe for recipe in recipes if recipe[5]]
    #Vegan
    if(user[3] == True):
        recipes = [recipe for recipe in recipes if recipe[4]]
    #halal
    if(user[4] == True):
        recipes = [recipe for recipe in recipes if recipe[8]]
    #Kosher
    if(user[5] == True):
        recipes = [recipe for recipe in recipes if recipe[9]]
    #Lactose
    if(user[6] == True):
        recipes = [recipe for recipe in recipes if recipe[6]]
    #Gluten
    if(user[7] == True):
        recipes = [recipe for recipe in recipes if recipe[7]]
    #Nut
    if(user[8] == True):
        recipes = [recipe for recipe in recipes if recipe[10]]
    #Shellfish
    if(user[9] == True):
        recipes = [recipe for recipe in recipes if recipe[11]]
    #Pescatarian
    if(user[10] == True):
        recipes = [recipe for recipe in recipes if recipe[12]]
   
    #Filter based on Cook time
    recipes = [recipe for recipe in recipes if recipe[13] <= max_cook_time]

    user_ingredients = "sugar butter milk vanilla nuts flour"
    user_ingredient_list = user_ingredients.split()

    #Filter based on # of missing ingredients
    filtered_recipes = []
    for recipe in recipes:
        recipe_ingredients = recipe[3].split(';')  
        missing_ingredients = sum(1 for ingredient in recipe_ingredients if ingredient not in user_ingredient_list)
        if missing_ingredients <= max_missing_ingredients:
            filtered_recipes.append(recipe)
    
    #recommendation system(tfidf, cosine sim)
            
    tfidf = TfidfVectorizer()

    vocab = []
    for ingredients in [filtered_recipes[3] for filtered_recipes in filtered_recipes]:
        ingredients = ingredients.replace(";", " ")
        vocab.append(ingredients)

    doctfidf = tfidf.fit_transform(vocab)
    querytfidf = tfidf.fit(vocab)
    querytfidf = querytfidf.transform([user_ingredients])

    cosineSimilarities = cosine_similarity(querytfidf, doctfidf).flatten()
       
   
    zipped_recipes = list(zip(filtered_recipes, cosineSimilarities))
    sorted_recipes = sorted(zipped_recipes, key=lambda x: x[1], reverse=True)
    sorted_recipes = [filtered_recipes[0] for filtered_recipes in sorted_recipes]

    limited_recipes = sorted_recipes[:100]
    
    #return recipes
    return jsonify({"recipes": limited_recipes})



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)