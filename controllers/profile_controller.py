from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from extensions import db
from models import Profile
from schemas.profile_schema import profile_schema
from controllers.auth_utils import current_user

profile_bp = Blueprint(
    "profile",
    __name__,
    url_prefix="/profile"
)


@profile_bp.route("", methods=["GET"])
@jwt_required()
def get_profile():

    profile = Profile.query.filter_by(
        user_id=current_user().id
    ).first()

    if not profile:
        return jsonify({
            "message": "Profile not found."
        }), 404

    return jsonify(profile_schema.dump(profile)), 200


@profile_bp.route("", methods=["PATCH"])
@jwt_required()
def update_profile():

    profile = Profile.query.filter_by(
        user_id=current_user().id
    ).first()

    if not profile:
        return jsonify({
            "message": "Profile not found."
        }), 404

    data = request.get_json()

    profile.phone = data.get("phone", profile.phone)
    profile.bio = data.get("bio", profile.bio)
    profile.location = data.get("location", profile.location)
    profile.profile_photo = data.get(
        "profile_photo",
        profile.profile_photo
    )

    db.session.commit()

    return jsonify(profile_schema.dump(profile)), 200