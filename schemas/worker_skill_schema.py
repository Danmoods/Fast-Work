from marshmallow import fields

from extensions import ma

from models import WorkerSkill

from schemas.skill_schema import SkillSchema


class WorkerSkillSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = WorkerSkill
        load_instance = False
        include_fk = True

    worker_id = fields.Integer(dump_only=True)

    skill = fields.Nested(SkillSchema, dump_only=True)
    
worker_skill_schema = WorkerSkillSchema()
worker_skills_schema = WorkerSkillSchema(many=True)