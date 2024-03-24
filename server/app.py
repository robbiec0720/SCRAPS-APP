from flask import Flask, jsonify
import psycopg2
from psycopg2 import OperationalError
import os
from dotenv import load_dotenv
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()

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
            cursor.execute("SELECT * FROM recipes 10;")
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

@app.route("/recommend", methods=["GET"])
def get_data():
    #username = request.form.get("username")
    username = 'apple'
    users = fetch_users(username)
    recipes = fetch_recipes()

    #Filter based on diet restrictions

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
   
    #recommendation system(tfidf, cosine sim)
    user_ingredients = "sugar butter milk vanilla nuts"
    vocab = []
    
    tfidf = TfidfVectorizer()

    for ingredients in [recipe[3] for recipe in recipes]:
        ingredients = ingredients.replace(";", " ")
        vocab.append(ingredients)

    doctfidf = tfidf.fit_transform(vocab)
    querytfidf = tfidf.fit(vocab)
    querytfidf = querytfidf.transform([user_ingredients])

    cosineSimilarities = cosine_similarity(querytfidf, doctfidf).flatten()
       
   
    zipped_recipes = list(zip(recipes, cosineSimilarities))
    sorted_recipes = sorted(zipped_recipes, key=lambda x: x[1], reverse=True)
    sorted_recipes = [recipe[0] for recipe in sorted_recipes]
    
    #filter user pref


    #return recipes
    return jsonify({"recipes": sorted_recipes})
    # if users is not None and recipes is not None:
    #     return jsonify({"users": users, "recipes": recipes})
    # else:
    #     return jsonify({"error": "Failed to fetch data"}), 500



if __name__ == "__main__":
    app.run(port=8000, debug=True)
