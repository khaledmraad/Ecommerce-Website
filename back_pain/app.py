from flask import Flask,request,jsonify
from flask_cors import CORS
from pymongo import MongoClient
import json
from bson.json_util import dumps


app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# client = MongoClient(host='test_mongodb',
#                          port=27017, 
#                          username='root', 
#                          password='pass')

client=MongoClient("mongodb://localhost:27017/")
    
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
                return jsonify({"name":json_request["userName"]}),302
    
            return "wrong password broo" ,200 

        return "user not signed" ,200

    else :
        return "check your input" ,400



# ----------------------------------------db manag
@app.route("/add_shop_item",methods = ['POST'])
def add_shop_item():
    json_request=json.loads(request.data)

    db_collection = client_db["shop_items"]

    new_doc = db_collection.insert_one(json_request)

    return "shit added",200


@app.route("/delete_item",methods = ['POST'])
def delete_item():
    json_request=json.loads(request.data)

    db_collection = client_db["shop_items"]

    if (db_collection.count_documents( {"ref":json_request["itemRef"]})==1) :

        db_collection.delete_one({"ref":json_request["itemRef"]})

        return "item killed",200
    

    return "no ref for you",200

@app.route("/getInfo",methods = ['POST'])
def getInfo():
    json_request=json.loads(request.data)

    db_collection = client_db["shop_items"]

    if (db_collection.count_documents( {"ref":json_request["ref"]})==1) :

        return dumps(db_collection.find_one({"ref":json_request["ref"]})),200

    return "no ref bro :(",200







@app.route("/ur_here")
def ur_here():
    return "work perffffffffictlyy"


@app.route('/')
def home():
    return "nice"



if __name__ == '__main__':
    app.run(debug=True)
