from marshmallow import fields, validate
from extensions import ma
from models import Job


class JobSchema(ma.SQLAlchemyAutoSchema):

    title = fields.String(
        required=True,
        validate=validate.Length(min=5, max=200)
    )

    description = fields.String(
        required=True,
        validate=validate.Length(
            min=10
        )
    )

    salary = fields.Float(
        required=True
    )

    location = fields.String(
        required=True,
        validate=validate.Length(
            min=2,
            max=100
        )
    )

    category_id = fields.Integer(
        required=True
    )
    employer_id = fields.Integer(
        dump_only=True
    )

    class Meta:
        model = Job
        load_instance = False
        include_fk = True


job_schema = JobSchema()
jobs_schema = JobSchema(many=True)
