from extensions import db
from datetime import datetime


class Job(db.Model):
    __tablename__ = "jobs"

    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    salary = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    employer = db.relationship("User", back_populates="jobs")
    applications = db.relationship("Application", back_populates="job", lazy=True)
    category_id = db.Column(db.Integer, db.ForeignKey("job_categories.id"), nullable=False)
    category = db.relationship("JobCategory", back_populates="jobs")