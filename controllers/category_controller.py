from flask import Blueprint, jsonify

from models import JobCategory
from schemas.job_category_schema import (
    job_category_schema,
    job_categories_schema
)

category_bp = Blueprint(
    "category",
    __name__,
    url_prefix="/categories"
)


@category_bp.route("", methods=["GET"])
def get_categories():

    categories = JobCategory.query.all()

    return jsonify(
        job_categories_schema.dump(categories)
    ), 200


@category_bp.route("/<int:id>", methods=["GET"])
def get_category(id):

    category = JobCategory.query.get_or_404(id)

    return jsonify(
        job_category_schema.dump(category)
    ), 200