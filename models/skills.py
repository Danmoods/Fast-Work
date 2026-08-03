from extensions import db

class Skill(db.Model):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    worker_skills = db.relationship("WorkerSkill", back_populates="skill", lazy=True)