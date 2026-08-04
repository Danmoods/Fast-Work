from extensions import ma
from models import User
from marshmallow import fields, validate

class UserSchema(ma.SQLAlchemyAutoSchema):

    username = fields.String(
        required=True,
        validate=validate.Length(min=3)
    )

    email = fields.Email(required=True)

    password = fields.String(
        required=True,
        load_only=True,
        validate=validate.Length(min=6)
    )

    role = fields.String(
        required=True,
        validate=validate.OneOf(
            ["worker","employer"]
        )
    )

    class Meta:
        model = User
        load_instance=True
        exclude=("password_hash",)

user_schema = UserSchema()
users_schema = UserSchema(many=True)