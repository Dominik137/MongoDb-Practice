from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB server
client = MongoClient("mongodb://localhost:27017/")  # Replace localhost and port if necessary
db = client["demo"]
collection = db["names"]

# API routes
@app.route('/data', methods=['GET'])
def get_data():
    # Retrieve data from MongoDB
    data = list(collection.find({}))
    return jsonify(data)

@app.route('/data', methods=['POST'])
def add_data():
    # Insert new data into MongoDB
    data = request.json
    result = collection.insert_one(data)
    return jsonify({"message": "Data added successfully", "inserted_id": str(result.inserted_id)})

if __name__ == '__main__':
    app.run(debug=True)
