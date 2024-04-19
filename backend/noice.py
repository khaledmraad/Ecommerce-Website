from pymongo import MongoClient


try:
    conn_string="mongodb://localhost:27017/"
    client=MongoClient(conn_string)
except:
    print("f this")

db=client["mydatabase"]

print(client.list_database_names())