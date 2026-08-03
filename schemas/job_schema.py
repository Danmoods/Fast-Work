from extensions import ma
from models import Job


class JobSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Job
        load_instance = True


job_schema = JobSchema()

jobs_schema = JobSchema(many=True)