from flask import Blueprint, jsonify

from models import Skill

from schemas.skill_schema import (
    skill_schema,
    skills_schema
)

skill_bp = Blueprint(
    "skill",
    __name__,
    url_prefix="/skills"
)

@skill_bp.route("", methods=["GET"])
def get_skills():

    skills = Skill.query.all()

    return jsonify(
        skills_schema.dump(skills)
    ), 200

@skill_bp.route("/<int:id>", methods=["GET"])
def get_skill(id):

    skill = Skill.query.get_or_404(id)

    return jsonify(
        skill_schema.dump(skill)
    ), 200