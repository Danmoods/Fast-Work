from extensions import ma
from models import Profile

class ProfileSchema(ma.SQLAlchemyAutoSchema):

    class Meta:

        model = Profile

        load_instance = True

    user = ma.Nested("UserSchema", exclude=("profile",))

profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)