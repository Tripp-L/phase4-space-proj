from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, Player, PlayerSchema

player_schema = PlayerSchema()

class UserRegister(Resource):
    def post(self):
        username = request.json.get('username', None)
        email = request.json.get('email', None)
        password = request.json.get('password', None)

        if not username or not email or not password:
            return jsonify({"msg": "Missing username, email, or password"}), 400

        if Player.query.filter_by(username=username).first() or Player.query.filter_by(email=email).first():
            return jsonify({"msg": "Username or email already exists"}), 409

        player = Player(username=username, email=email, password=password)
        db.session.add(player)
        db.session.commit()

        return player_schema.jsonify(player), 201

class UserLogin(Resource):
    def post(self):
        email = request.json.get('email', None)
        password = request.json.get('password', None)

        player = Player.query.filter_by(email=email).first()
        if not player or not player.authenticate(password):
            return jsonify({"msg": "Invalid email or password"}), 401

        access_token = create_access_token(identity=player.id)
        return jsonify(access_token=access_token)

class ProtectedResource(Resource):
    @jwt_required()
    def get(self):
        player_id = get_jwt_identity()
        player = Player.query.get(player_id)
        return player_schema.jsonify(player)