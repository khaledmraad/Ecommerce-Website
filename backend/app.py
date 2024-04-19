from flask import Flask,request,jsonify
from flask_cors import CORS
from pymongo import MongoClient
import json
from bson.json_util import dumps
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager



app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "secret_key"

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)


jwt = JWTManager(app)
 
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# client = MongoClient(host='test_mongodb',
#                          port=27017, 
#                          username='root', 
#                          password='pass')

client=MongoClient("mongodb://localhost:27017/")
    
client_db = client["ecommerce"]

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


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
    


@app.route('/token',methods = ['POST'])
def login():
    
    userName=request.json.get("username", "")
    password=request.json.get("password", "")

    if (userName!="" and password!="" ):
        
        db_collection = client_db["customers"]

        if (db_collection.count_documents( {"userNam":userName})==1) :  
            if (db_collection.count_documents( {"userNam":userName,"userPass":password})==1) :
                
                access_token = create_access_token(identity=userName)

                response = {"access_token":access_token}

                return response,200

                # return jsonify({"name":  str(db_collection.find({"userNam":json_request["userName"],"userPass":json_request["userPass"]})[0]['_id'] )  }),302
                
            return "wrong password broo" ,400 

        return "user not signed" ,400

    else :
        return "check your input" ,400

@app.route('/profile')
@jwt_required()
def my_profile():
    current_user = get_jwt_identity()
    print(current_user)

    return "ksljcdn"


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response



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

        return dumps(db_collection.find_one({"ref":json_request["ref"]},{ "_id": 0})),200

    return "no ref bro :(",404







@app.route("/ur_here")
def ur_here():
    return "work perffffffffictlyy"


@app.route('/')
def home():
    return "nice"



if __name__ == '__main__':
    app.run(debug=True)
