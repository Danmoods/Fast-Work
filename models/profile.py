class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey("users.id"))

    phone = db.Column(db.String(20))
    bio = db.Column(db.Text)

    user = db.relationship(
        "User",back_populates="profile"
    )