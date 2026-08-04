from flask import Flask

from extensions import db, ma, jwt, migrate
from config import Config
from flask_migrate import Migrate
from controllers.auth_controller import auth_bp
from controllers.job_controller import job_bp
from controllers.application_controller import application_bp
from controllers.profile_controller import profile_bp
from controllers.category_controller import category_bp
from controllers.skill_controller import skill_bp
from controllers.worker_skill_controller import worker_skill_bp





app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(auth_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(job_bp)
app.register_blueprint(application_bp)
app.register_blueprint(category_bp)
app.register_blueprint(skill_bp)
app.register_blueprint(worker_skill_bp)

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


@app.route("/")
def home():
    return {
        "message": "Fast-Work API is running successfully!"
    }


if __name__ == "__main__":
    app.run(debug=True)