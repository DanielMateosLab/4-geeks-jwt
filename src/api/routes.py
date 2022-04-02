from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, current_user

api = Blueprint('api', __name__)

@api.route("/users", methods=["POST"])
def create_user():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()
    if user != None:
        return jsonify({ "msg": "User already exists" }), 400

    if email == None or password == None:
        return jsonify({ "msg": "Email and password are required"}), 400

    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)
    return jsonify({
        "msg": f"Successfully created user with email {user}",
        "token": access_token
    })
    
    
@api.route("/private")
@jwt_required()
def private():
    return jsonify(current_user.serialize()), 200

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email")
    password = request.json.get("password")
    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token })

