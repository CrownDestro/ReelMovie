from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from bson.objectid import ObjectId
from bson.json_util import dumps

load_dotenv()

app = Flask(__name__)
CORS(app)

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client['<Reviews>']
reviews_collection = db['review']

films_data = [
    {"title": "The Substance", "poster": "/the_substance.jpg", "views": "720K", "likes": "141K", "favorites": "280K"},
    {"title": "Smile 2", "poster": "/smile2.jpg", "views": "114K", "likes": "31K", "favorites": "36K"},
    {"title": "The Wild Robot", "poster": "/the_wild_robot.jpg", "views": "283K", "likes": "69K", "favorites": "140K"},
    {"title": "Woman of the Hour", "poster": "/woman_of_the_hour.jpg", "views": "96K", "likes": "17K", "favorites": "19K"},
    {"title": "We Live In Time", "poster": "/we_live_in_time.jpg", "views": "78K", "likes": "29K", "favorites": "29K"},
    {"title": "Venom: The Last Dance", "poster": "/venom_last_dance.jpg", "views": "57K", "likes": "19K", "favorites": "14K"},
    {"title": "It's What's Inside", "poster": "/its_whats_inside.jpg", "views": "236K", "likes": "38K", "favorites": "70K"},
    {"title": "Smile", "poster": "/smile.jpg", "views": "991K", "likes": "123K", "favorites": "164K"},
]

@app.route("/api/films", methods=["GET"])
def get_films():
    return jsonify(films_data)

@app.route("/api/films/<title>/reviews", methods=["GET"])
def get_reviews(title):
    movie_reviews = reviews_collection.find({"title": title}, {"_id": 1, "review": 1})
    serialized_reviews = [
        {"_id": str(review["_id"]), "review": review["review"]}
        for review in movie_reviews
    ]
    return jsonify(serialized_reviews)

@app.route("/api/films/<title>/reviews", methods=["POST"])
def add_review(title):
    review_text = request.json.get("review")
    if not review_text:
        return jsonify({"error": "Review text is required"}), 400
    reviews_collection.insert_one({"title": title, "review": review_text})
    return jsonify({"message": "Review added successfully"}), 201

@app.route("/api/films/<title>/reviews/<review_id>", methods=["PUT"])
def update_review(title, review_id):
    review_text = request.json.get("review")
    if not review_text:
        return jsonify({"error": "Review text is required"}), 400
    try:
        review_id = ObjectId(review_id)
    except Exception as e:
        return jsonify({"error": f"Invalid ObjectId: {str(e)}"}), 400
    reviews_collection.update_one({"_id": review_id}, {"$set": {"review": review_text}})
    updated_review = reviews_collection.find_one({"_id": review_id})
    return jsonify({"_id": str(updated_review["_id"]), "review": updated_review["review"]}), 200

@app.route("/api/films/<title>/reviews/<review_id>", methods=["DELETE"])
def delete_review(title, review_id):
    reviews_collection.delete_one({"_id": ObjectId(review_id)})
    return jsonify({"message": "Review deleted successfully"}), 204

if __name__ == "__main__":
    app.run(debug=True)
