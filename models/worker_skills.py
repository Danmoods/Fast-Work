from extensions import db

class WorkerSkill(db.Model):
    __tablename__ = "worker_skills"

    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), nullable=False)
    years_of_experience = db.Column(db.Integer, nullable=False)
    worker = db.relationship("User", back_populates="worker_skills", lazy=True)
    skill = db.relationship("Skill", back_populates="worker_skills")