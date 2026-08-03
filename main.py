from flask import Flask

from extensions import db, ma, jwt, migrate
from config import Config
from flask_migrate import Migrate
from controllers.auth_controller import auth_bp
from controllers.job_controller import job_bp


app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(auth_bp)
app.register_blueprint(job_bp)

migrate = Migrate(app, db)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "your-secret-key"


db.init_app(app)
ma.init_app(app)
jwt.init_app(app)
migrate.init_app(app, db)

from models.user import User
from models.job import Job
from models.application import Application
from models.job_category import JobCategory
from models.skill import Skill
from models.worker_skill import WorkerSkill
from models.profile import Profile


if __name__ == "__main__":
    app.run(debug=True)