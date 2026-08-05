from extensions import db

class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id"))
    phone = db.Column(db.String(20),nullable=True)
    bio = db.Column(db.Text,nullable=True)
    location = db.Column(db.String(100),nullable=True)
    profile_photo = db.Column(db.String(200),nullable=True)
    user = db.relationship("User",back_populates="profile")