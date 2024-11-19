# from pymongo import MongoClient
# from urllib.parse import quote_plus

# password = quote_plus("Dheeraj@2005")
# MONGO_URI = "mongodb+srv://motupallidheeraj:dheeraj2005@dheeraj-cluster.y8j8b.mongodb.net/?retryWrites=true&w=majority&appName=Dheeraj-cluster"
# client = MongoClient(MONGO_URI)

# try:
#     client.admin.command('ping')  # Test connection
#     print("MongoDB connection successful!")
# except Exception as e:
#     print(f"Error: {e}")


# import psycopg2
# print("psycopg2 installed successfully!")

from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)

MONGO_URI = "mongodb+srv://motupallidheeraj:2005@dheeraj-cluster.y8j8b.mongodb.net/?retryWrites=true&w=majority&appName=Dheeraj-cluster"
client = MongoClient(MONGO_URI)
db = client['<Reviews>']
reviews_collection = db['review']

try:
    print(client.server_info())
    print("Connection successful!")
except Exception as e:
    print("Error connecting to MongoDB:", e)
