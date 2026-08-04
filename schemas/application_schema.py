from marshmallow import fields, validate
from extensions import ma
from models import Application


class ApplicationSchema(ma.SQLAlchemyAutoSchema):

    cover_letter = fields.String(
        required=True,
        validate=validate.Length(min=10)
    )

    status = fields.String(
        dump_only=True
    )

    worker_id = fields.Integer(
        dump_only=True
    )

    job_id = fields.Integer(
        required=True
    )

    class Meta:
        model = Application
        load_instance = False
        include_fk = True


application_schema = ApplicationSchema()
applications_schema = ApplicationSchema(many=True)