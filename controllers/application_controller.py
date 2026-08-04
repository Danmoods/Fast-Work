from flask import Blueprint, request, jsonify

from flask_jwt_extended import jwt_required

from marshmallow import ValidationError

from extensions import db

from models import Application, Job

from schemas.application_schema import (
    application_schema,
    applications_schema
)

from controllers.auth_utils import (
    current_user,
    worker_required,
    employer_required
)

application_bp = Blueprint("application", __name__, url_prefix="/applications")

@application_bp.route("", methods=["POST"])
@jwt_required()
def apply_for_job():

    response = worker_required()
    if response:
        return response

    try:
        data = application_schema.load(request.get_json())
    except ValidationError as err:
        return jsonify(err.messages), 400

    job_id = data["job_id"]
    cover_letter = data["cover_letter"]

    if not job_id:
        return jsonify({"message": "job_id is required"}), 400

    job = Job.query.get(job_id)

    if not job:
        return jsonify({"message": "Job not found"}), 404

    existing = Application.query.filter_by(
        worker_id=current_user().id,
        job_id=job_id
    ).first()

    if existing:
        return jsonify({"message": "You already applied for this job"}), 400

    application = Application(
        worker_id=current_user().id,
        job_id=job_id,
        cover_letter=cover_letter,
        status="pending"
    )

    db.session.add(application)
    db.session.commit()

    return jsonify(application_schema.dump(application)), 201


@application_bp.route("", methods=["GET"])
@jwt_required()
def get_my_applications():

    response = worker_required()

    if response:
        return response

    worker = current_user()

    applications = Application.query.filter_by(
        worker_id=worker.id
    ).all()

    return jsonify(
        applications_schema.dump(applications)
    ), 200


@application_bp.route("/<int:id>", methods=["GET"])
@jwt_required()
def get_application(id):

    response = worker_required()

    if response:
        return response

    application = Application.query.get_or_404(id)

    worker = current_user()

    if application.worker_id != worker.id:
        return jsonify({
            "message": "Access denied."
        }), 403

    return jsonify(
        application_schema.dump(application)
    ), 200


@application_bp.route("/job/<int:job_id>", methods=["GET"])
@jwt_required()
def get_job_applications(job_id):

    response = employer_required()

    if response:
        return response

    job = Job.query.get_or_404(job_id)

    employer = current_user()

    if job.employer_id != employer.id:
        return jsonify({
            "message": "Access denied."
        }), 403

    applications = Application.query.filter_by(
        job_id=job.id
    ).all()

    return jsonify(
        applications_schema.dump(applications)
    ), 200


@application_bp.route("/<int:id>", methods=["PATCH"])
@jwt_required()
def update_application(id):

    response = employer_required()

    if response:
        return response

    application = Application.query.get_or_404(id)

    employer = current_user()

    if application.job.employer_id != employer.id:
        return jsonify({
            "message": "Access denied."
        }), 403

    data = request.get_json()

    status = data.get("status")

    if status not in ["pending", "accepted", "rejected"]:
        return jsonify({
            "message": "Invalid status."
        }), 400

    application.status = status

    db.session.commit()

    return jsonify(
        application_schema.dump(application)
    ), 200

@application_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_application(id):

    response = worker_required()

    if response:
        return response

    application = Application.query.get_or_404(id)

    worker = current_user()

    if application.worker_id != worker.id:
        return jsonify({
            "message":"Access denied."
        }),403

    db.session.delete(application)

    db.session.commit()

    return jsonify({
        "message":"Application withdrawn successfully."
    }),200