from flask import Flask

from extensions import db, ma, jwt, migrate


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///jobs.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "your-secret-key"


db.init_app(app)
ma.init_app(app)
jwt.init_app(app)
migrate.init_app(app, db)


if __name__ == "__main__":
    app.run(debug=True)