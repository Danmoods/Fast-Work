from flask import Blueprint, jsonify

from models import User
from schemas.user_schema import user_schema

user_bp = Blueprint(
    "user",
    __name__,
    url_prefix="/users"
)


@user_bp.route("/<int:id>", methods=["GET"])
def get_user(id):

    user = User.query.get_or_404(id)

    return jsonify(user_schema.dump(user)), 200