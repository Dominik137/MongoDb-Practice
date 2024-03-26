from flask import Flask, jsonify, request
from pymongo import MongoClient
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
        "_id": str(result.inserted_id),
        "name": inserted_name
    })

@app.route('/data/<string:id>', methods=['DELETE', 'PATCH'])
def delete_update(id):
    if request.method == "DELETE":
        # Delete data from MongoDB
        result = collection.delete_one({'_id': ObjectId(id)})
        
        if result.deleted_count == 1:
            return jsonify({"message": "Data deleted successfully"})
        else:
            return jsonify({"message": "Data not found or could not be deleted"}), 404
    elif request.method == "PATCH":
            # Update data in MongoDB
        data = request.json
        updated_data = {"$set": data}  # Using $set operator to update specific fields
        
        result = collection.update_one({'_id': ObjectId(id)}, updated_data)
        
        if result.modified_count == 1:
            return jsonify({"message": "Data updated successfully"})
        else:
            return jsonify({"message": "Data not found or could not be updated"}), 404


if __name__ == '__main__':
    app.run(debug=True)
