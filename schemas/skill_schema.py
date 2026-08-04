from extensions import ma

from models import Skill


class SkillSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Skill
        load_instance = True


skill_schema = SkillSchema()
skills_schema = SkillSchema(many=True)