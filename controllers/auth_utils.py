from flask_jwt_extended import get_jwt_identity
from models import User
from flask import jsonify


def current_user():
    user_id = get_jwt_identity()
    return User.query.get(int(user_id))

def employer_required():

    user = current_user()

    if user.role != "employer":
        return jsonify({
            "message": "Employer access required."
        }), 403

    return None

def worker_required():

    user = current_user()

    if user.role != "worker":
        return jsonify({
            "message": "Worker access required."
        }), 403

    return None

