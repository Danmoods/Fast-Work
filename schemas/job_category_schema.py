from extensions import ma
from models import JobCategory


class JobCategorySchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = JobCategory
        load_instance = False


job_category_schema = JobCategorySchema()
job_categories_schema = JobCategorySchema(many=True)