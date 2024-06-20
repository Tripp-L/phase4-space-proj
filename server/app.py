#!/usr/bin/env python3

import os
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy_serializer import SerializerMixin
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
api = Api(app)
CORS(app)
bcrypt = Bcrypt(app)


app.config.from_object('config.Config')  
db = SQLAlchemy(app)
migrate = Migrate(app, db)


from models import Player, Spacecraft, Mission, CelestialBody


class PlayerSchema(SerializerMixin):
    class Meta:
        model = Player
        fields = ('id', 'name', 'age', 'origin', 'imageurl')

class SpacecraftSchema(SerializerMixin):
    class Meta:
        model = Spacecraft
        fields = ('id', 'name', 'speed', 'fuel_log', 'equipment', 'image')

class MissionSchema(SerializerMixin):
    class Meta:
        model = Mission
        fields = ('id', 'name', 'description', 'imageurl', 'player_id', 'spacecraft_id', 'celestial_body_id')  

class CelestialBodySchema(SerializerMixin):
    class Meta:
        model = CelestialBody
        fields = ('id', 'name', 'type', 'description', 'distance', 'imageUrl')


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


api.add_resource(SpacecraftsListResource, '/spacecrafts')
api.add_resource(SpacecraftResource, '/spacecrafts/<int:spacecraft_id>')
api.add_resource(PlayersListResource, '/players')
api.add_resource(PlayerResource, '/players/<int:player_id>')
api.add_resource(MissionsListResource, '/missions')
api.add_resource(MissionResource, '/missions/<int:mission_id>')
api.add_resource(CelestialBodiesListResource, '/celestial_bodies')
api.add_resource(CelestialBodyResource, '/celestial_bodies/<int:celestial_body_id>')


@app.route('/')
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(port=5555, debug=True) 