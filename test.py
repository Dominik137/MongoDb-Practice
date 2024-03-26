import pymongo

# Connect to MongoDB server
client = pymongo.MongoClient("mongodb://localhost:27017/")

# Select database (create it if it doesn't exist)
db = client["demo"]

# Select collection (create it if it doesn't exist)
collection = db["names"]

# Data to insert
data = {"name": "John", "age": 30, "city": "New York"}

# Insert data into collection
result = collection.insert_one(data)

# Print the inserted document's ID
print("Inserted ID:", result.inserted_id)