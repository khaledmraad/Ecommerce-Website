from flask import Flask,request
from flask_cors import CORS
from pymongo import MongoClient
import json


app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

client = MongoClient(host='test_mongodb',
                         port=27017, 
                         username='root', 
                         password='pass')
    
client_db = client["ecommerce"]


@app.route('/signup',methods = ['POST'])
def signup():
    
    json_request=json.loads(request.data)

    if (json_request["userNam"]!="" and json_request["userEmail"]!="" and json_request["userPass"]!=""):
        
        db_collection = client_db["customers"]

        if (db_collection.count_documents( {"userNam":json_request["userNam"]})==1 or db_collection.count_documents( {"userEmail":json_request["userEmail"]})==1) :

            return "email or userName already exist" ,200
        
        new_doc = db_collection.insert_one(json_request)

        print(new_doc.inserted_id)
        
        return "User Pwnedd" ,200

    else :
        return "check your input" ,400
    


@app.route('/login',methods = ['POST'])
def login():
    
    json_request=json.loads(request.data)

    if (json_request["userName"]!="" and json_request["userPass"]!="" ):
        
        db_collection = client_db["customers"]

        if (db_collection.count_documents( {"userNam":json_request["userName"]})==1) :  
            if (db_collection.count_documents( {"userNam":json_request["userName"],"userPass":json_request["userPass"]})==1) :
                return "ur LoggedIn" ,200 
    
            return "wrong password broo" ,200 

        return "user not signed" ,200

    else :
        return "check your input" ,400

    

@app.route('/')
def home():
    return "nice"



if __name__ == '__main__':
    app.run(debug=True)
