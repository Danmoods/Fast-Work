from flask import Blueprint, request, jsonify

from flask_jwt_extended import jwt_required

from extensions import db

from models import WorkerSkill, Skill

from schemas.worker_skill_schema import (
    worker_skill_schema,
    worker_skills_schema
)

from controllers.auth_utils import (
    current_user,
    worker_required
)

from marshmallow import ValidationError

worker_skill_bp = Blueprint(
    "worker_skill",
    __name__,
    url_prefix="/worker-skills"
)

@worker_skill_bp.route("", methods=["GET"])
@jwt_required()
def get_my_skills():

    response = worker_required()

    if response:
        return response

    worker = current_user()

    skills = WorkerSkill.query.filter_by(
        worker_id=worker.id
    ).all()

    return jsonify(
        worker_skills_schema.dump(skills)
    ), 200

@worker_skill_bp.route("/<int:worker_id>", methods=["GET"])
def get_worker_skills(worker_id):

    skills = WorkerSkill.query.filter_by(
        worker_id=worker_id
    ).all()

    return jsonify(
        worker_skills_schema.dump(skills)
    ), 200

@worker_skill_bp.route("", methods=["POST"])
@jwt_required()
def add_skill():

    response = worker_required()

    if response:
        return response

    try:
        data = worker_skill_schema.load(request.get_json())

    except ValidationError as err:
        return jsonify(err.messages), 400

    skill = Skill.query.get(data["skill_id"])

    if not skill:
        return jsonify({
            "message": "Skill not found."
        }), 404

    existing = WorkerSkill.query.filter_by(
        worker_id=current_user().id,
        skill_id=data["skill_id"]
    ).first()

    if existing:
        return jsonify({
            "message": "Skill already added."
        }), 400

    worker_skill = WorkerSkill(
        worker_id=current_user().id,
        skill_id=data["skill_id"],
        years_of_experience=data["years_of_experience"]
    )

    db.session.add(worker_skill)
    db.session.commit()

    return jsonify(
        worker_skill_schema.dump(worker_skill)
    ), 201

@worker_skill_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_skill(id):

    response = worker_required()

    if response:
        return response

    worker_skill = WorkerSkill.query.get_or_404(id)

    if worker_skill.worker_id != current_user().id:
        return jsonify({
            "message": "Access denied."
        }), 403

    db.session.delete(worker_skill)
    db.session.commit()

    return jsonify({
        "message": "Skill removed successfully."
    }), 200


