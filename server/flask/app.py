from flask import Flask, jsonify
import psycopg2
from psycopg2 import OperationalError
import os
from dotenv import load_dotenv

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
            cursor.execute("SELECT * FROM recipes LIMIT 10;")
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
    username = 'bob'
    users = fetch_users(username)
    recipes = fetch_recipes()
    if users is not None and recipes is not None:
        return jsonify({"users": users, "recipes": recipes})
    else:
        return jsonify({"error": "Failed to fetch data"}), 500
    #Filter based on diet restrictions
    #recommendation system(tfidf, cosine sim)
    #filter user pref
    #return recipes



if __name__ == "__main__":
    app.run(debug=True)
