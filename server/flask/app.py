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
    user = data['userjson']
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
    if(user[3] == True):
        recipes = [recipe for recipe in recipes if recipe[5]]
    #Vegan
    if(user[4] == True):
        recipes = [recipe for recipe in recipes if recipe[4]]
    #halal
    if(user[5] == True):
        recipes = [recipe for recipe in recipes if recipe[8]]
    #Kosher
    if(user[6] == True):
        recipes = [recipe for recipe in recipes if recipe[9]]
    #Lactose
    if(user[7] == True):
        recipes = [recipe for recipe in recipes if recipe[6]]
    #Gluten
    if(user[8] == True):
        recipes = [recipe for recipe in recipes if recipe[7]]
    #Nut
    if(user[9] == True):
        recipes = [recipe for recipe in recipes if recipe[10]]
    #Shellfish
    if(user[10] == True):
        recipes = [recipe for recipe in recipes if recipe[11]]
    #Pescatarian
    if(user[11] == True):
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
    
    #return recipes
    
    return filtered_data



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9000, debug=True)