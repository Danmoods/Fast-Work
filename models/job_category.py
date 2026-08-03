from extensions import db

class JobCategory(db.Model):
    __tablename__ = "job_categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    jobs = db.relationship("Job", back_populates="category", lazy=True)