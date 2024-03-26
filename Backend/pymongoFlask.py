from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask import Flask
from flask_cors import CORS
from bson import ObjectId  # Import ObjectId from bson

app = Flask(__name__)
CORS(app)

# Connect to MongoDB server
client = MongoClient("mongodb://localhost:27017/")  # Replace localhost and port if necessary
db = client["demo"]
collection = db["names"]

# API routes
@app.route('/data', methods=['GET'])
def get_data():
    # Retrieve data from MongoDB
    data = list(collection.find({}))
    
    # Convert ObjectId to strings
    for item in data:
        item['_id'] = str(item['_id'])
    
    return jsonify(data)


@app.route('/data', methods=['POST'])
def add_data():
    # Insert new data into MongoDB
    data = request.json
    result = collection.insert_one(data)
    inserted_name = data.get('name', 'Unknown')
    return jsonify({
        "message": "Data added successfully",
        "inserted_id": str(result.inserted_id),
        "name": inserted_name
    })
if __name__ == '__main__':
    app.run(debug=True)
