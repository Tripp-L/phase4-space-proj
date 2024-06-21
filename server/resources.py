from flask import request, jsonify, make_response, session
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import db, Player, PlayerSchema, Spacecraft, SpacecraftSchema, Mission, MissionSchema, CelestialBody, CelestialBodySchema

player_schema = PlayerSchema()

class UserRegister(Resource):
    def post(self):
        username = request.json.get('username')
        email = request.json.get('email')
        password = request.json.get('password')

        if not username or not email or not password:
            return make_response(jsonify({"msg": "Missing username, email, or password"}), 400)

        if Player.query.filter_by(username=username).first() or Player.query.filter_by(email=email).first():
            return make_response(jsonify({"msg": "Username or email already exists"}), 409)

        player = Player(username=username, email=email, password=password)
        db.session.add(player)
        db.session.commit()

        return make_response(jsonify({"username": player.username}), 201)

class UserLogin(Resource):
    def post(self):
        email = request.json.get('email')
        password = request.json.get('password')
        
        # Assuming Player is your SQLAlchemy model
        player = Player.query.filter_by(email=email).first()
        
        if not player or not player.authenticate(password):
            return jsonify({"msg": "Invalid email or password"}), 401
        
        # If authentication succeeds, set a cookie and return a response
        response = make_response("Setting cookie!")
        response.set_cookie('cookie_name', 'cookie_value', max_age=3600)  # example: cookie valid for 1 hour
        
        # Create JWT access token
        access_token = create_access_token(identity=player.id)
        
        # Return both the cookie-setting response and the access token
        return jsonify(access_token=access_token), response
class ProtectedResource(Resource):
    @jwt_required()
    def get(self):
        player_id = get_jwt_identity()
        player = Player.query.get(player_id)
        return player_schema.jsonify(player)

class SpacecraftsListResource(Resource):
    def get(self):
        spacecrafts = Spacecraft.query.all()
        return jsonify(SpacecraftSchema(many=True).dump(spacecrafts))

    def post(self):
        data = request.get_json()
        new_spacecraft = Spacecraft(**data)  
        db.session.add(new_spacecraft)
        db.session.commit()
        return jsonify(SpacecraftSchema().dump(new_spacecraft)), 201

class SpacecraftResource(Resource):
    def get(self, spacecraft_id):
        spacecraft = Spacecraft.query.get_or_404(spacecraft_id)
        return jsonify(SpacecraftSchema().dump(spacecraft))

    def put(self, spacecraft_id):
        spacecraft = Spacecraft.query.get_or_404(spacecraft_id)
        data = request.get_json()
        for key, value in data.items():
            setattr(spacecraft, key, value)  
        db.session.commit()
        return jsonify(SpacecraftSchema().dump(spacecraft))

    def delete(self, spacecraft_id):
        spacecraft = Spacecraft.query.get_or_404(spacecraft_id)
        db.session.delete(spacecraft)
        db.session.commit()
        return '', 204

class PlayersListResource(Resource):
    def get(self):
        players = Player.query.all()
        return jsonify(PlayerSchema(many=True).dump(players))

    def post(self):
        data = request.get_json()
        new_player = Player(**data)
        db.session.add(new_player)
        db.session.commit()
        return jsonify(PlayerSchema().dump(new_player)), 201

class PlayerResource(Resource):
    def get(self, player_id):
        player = Player.query.get_or_404(player_id)
        return jsonify(PlayerSchema().dump(player))

    def put(self, player_id):
        player = Player.query.get_or_404(player_id)
        data = request.get_json()
        for key, value in data.items():
            setattr(player, key, value)  
        db.session.commit()
        return jsonify(PlayerSchema().dump(player))

    def delete(self, player_id):
        player = Player.query.get_or_404(player_id)
        db.session.delete(player)
        db.session.commit()
        return '', 204

class MissionsListResource(Resource):
    def get(self):
        missions = Mission.query.all()
        return jsonify(MissionSchema(many=True).dump(missions))

    def post(self):
        data = request.get_json()
        new_mission = Mission(**data)
        db.session.add(new_mission)
        db.session.commit()
        return jsonify(MissionSchema().dump(new_mission)), 201

class MissionResource(Resource):
    def get(self, mission_id):
        mission = Mission.query.get_or_404(mission_id)
        return jsonify(MissionSchema().dump(mission))

    def put(self, mission_id):
        mission = Mission.query.get_or_404(mission_id)
        data = request.get_json()
        for key, value in data.items():
            setattr(mission, key, value) 
        db.session.commit()
        return jsonify(MissionSchema().dump(mission))

    def delete(self, mission_id):
        mission = Mission.query.get_or_404(mission_id)
        db.session.delete(mission)
        db.session.commit()
        return '', 204

class CelestialBodiesListResource(Resource):
    def get(self):
        celestial_bodies = CelestialBody.query.all()
        return jsonify(CelestialBodySchema(many=True).dump(celestial_bodies))

    def post(self):
        data = request.get_json()
        new_celestial_body = CelestialBody(**data)  
        db.session.add(new_celestial_body)
        db.session.commit()
        return jsonify(CelestialBodySchema().dump(new_celestial_body)), 201

class CelestialBodyResource(Resource):
    def get(self, celestial_body_id):
        celestial_body = CelestialBody.query.get_or_404(celestial_body_id)
        return jsonify(CelestialBodySchema().dump(celestial_body))

    def put(self, celestial_body_id):
        celestial_body = CelestialBody.query.get_or_404(celestial_body_id)
        data = request.get_json()
        for key, value in data.items():
            setattr(celestial_body, key, value)
        db.session.commit()
        return jsonify(CelestialBodySchema().dump(celestial_body))

    def delete(self, celestial_body_id):
        celestial_body = CelestialBody.query.get_or_404(celestial_body_id)
        db.session.delete(celestial_body)
        db.session.commit()
        return '', 204