from flask import Blueprint, request, jsonify

from flask_jwt_extended import jwt_required

from extensions import db

from models import Job

from models.application import Application
from schemas.job_schema import (
    job_schema,
    jobs_schema
)

from controllers.auth_utils import (
    current_user,
    employer_required
)

job_bp = Blueprint("job", __name__, url_prefix="/jobs")

@job_bp.route("", methods=["GET"])
def get_jobs():
    jobs = Job.query.all()
    return jsonify(jobs_schema.dump(jobs)), 200

@job_bp.route("/<int:job_id>", methods=["GET"])
def get_job(job_id):
    job = Job.query.get_or_404(job_id)
    return jsonify(job_schema.dump(job)), 200

@job_bp.route("", methods=["POST"])
@jwt_required()
def create_job():
    error = employer_required()
    if error:
        return error

    data = request.get_json()
    employer = current_user()


    job = Job(
        title=data.get("title"),
        description=data.get("description"),
        salary=data.get("salary"),
        location=data.get("location"),
        category_id=data.get("category_id"),
        employer_id=employer.id
    )
    db.session.add(job)
    db.session.commit()
    return jsonify(job_schema.dump(job)), 201


@job_bp.route("/<int:id>", methods=["PATCH"])
@jwt_required()
def update_job(id):

    error = employer_required()

    if error:
        return error

    job = Job.query.get_or_404(id)

    employer = current_user()

    # Only the employer who created the job can edit it
    if job.employer_id != employer.id:
        return jsonify({
            "message": "You are not allowed to update this job."
        }), 403

    data = request.get_json()

    job.title = data.get("title", job.title)
    job.description = data.get("description", job.description)
    job.salary = data.get("salary", job.salary)
    job.location = data.get("location", job.location)
    job.category_id = data.get("category_id", job.category_id)

    db.session.commit()

    return jsonify(job_schema.dump(job)), 200


@job_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_job(id):

    error = employer_required()

    if error:
        return error

    job = Job.query.get_or_404(id)

    employer = current_user()

    if job.employer_id != employer.id:
        return jsonify({
            "message": "You are not allowed to delete this job."
        }), 403
    
    Application.query.filter_by(job_id=job.id).delete()

    db.session.delete(job)
    db.session.commit()

    return jsonify({
        "message": "Job deleted successfully."
    }), 200