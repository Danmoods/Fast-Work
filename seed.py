from datetime import datetime

from main import app
from extensions import db

from models import (
    User,
    Profile,
    Job,
    JobCategory,
    Skill,
    WorkerSkill,
    Application
)

def clear_database():
    Application.query.delete()
    WorkerSkill.query.delete()
    Job.query.delete()
    JobCategory.query.delete()
    Profile.query.delete()
    User.query.delete()
    Skill.query.delete()
    db.session.commit()

    print("Database cleared successfully.")

def seed_categories():
    cleaning = JobCategory(name="Cleaning")
    construction = JobCategory(name="Construction")
    transport = JobCategory(name="Transport")
    hospitality = JobCategory(name="Hospitality")
    beauty = JobCategory(name="Beauty")

    db.session.add_all([
        cleaning,
        construction,
        transport,
        hospitality,
        beauty
    ])

    db.session.commit()
    print("Job categories seeded successfully.")

def seed_skills():

    driving = Skill(name="Driving")
    plumbing = Skill(name="Plumbing")
    carpentry = Skill(name="Carpentry")
    electrical = Skill(name="Electrical")
    cleaning = Skill(name="Cleaning")

    db.session.add_all([
        driving,
        plumbing,
        carpentry,
        electrical,
        cleaning
    ])

    db.session.commit()
    print("Skills seeded successfully.")

def seed_users():
    employer1 = User(username="employer1", email="Danmoods@example.com", password="password123", role="employer")
    worker1 = User(username="worker1", email="Bettexample.com", password="password123", role="worker")

    db.session.add_all([
        employer1,
        worker1
    ])

    db.session.commit()
    print("Users seeded successfully.")

def seed_profiles():
    employer1 = User.query.filter_by(username="employer1").first()
    worker1 = User.query.filter_by(username="worker1").first()

    profile1 = Profile(user_id=employer1.id, bio="Experienced employer in the cleaning industry.", phone="0712345678")
    profile2 = Profile(user_id=worker1.id, bio="Skilled worker with experience in plumbing and carpentry.", phone="0789012345")

    db.session.add_all([
        profile1,
        profile2
    ])

    db.session.commit()
    print("Profiles seeded successfully.")

def seed_jobs():
    employer1 = User.query.filter_by(username="employer1").first()
    cleaning_category = JobCategory.query.filter_by(name="Cleaning").first()

    job1 = Job(
        employer_id=employer1.id,
        title="House Cleaning",
        description="Looking for a reliable house cleaner.",
        salary=15.0,
        location="Nairobi",
        category_id=cleaning_category.id
    )

    db.session.add(job1)
    db.session.commit()
    print("Jobs seeded successfully.")

def seed_worker_skills():
    worker1 = User.query.filter_by(username="worker1").first()
    plumbing_skill = Skill.query.filter_by(name="Plumbing").first()
    carpentry_skill = Skill.query.filter_by(name="Carpentry").first()

    worker_skill1 = WorkerSkill(worker_id=worker1.id, skill_id=plumbing_skill.id, years_of_experience=3)
    worker_skill2 = WorkerSkill(worker_id=worker1.id, skill_id=carpentry_skill.id, years_of_experience=2)

    db.session.add_all([
        worker_skill1,
        worker_skill2
    ])

    db.session.commit()
    print("Worker skills seeded successfully.")

def seed_applications():
    worker1 = User.query.filter_by(username="worker1").first()
    job1 = Job.query.filter_by(title="House Cleaning").first()

    application1 = Application(
        worker_id=worker1.id,
        job_id=job1.id,
        cover_letter="I am very interested in this position and have experience in cleaning.",
        status="pending"
    )

    db.session.add(application1)
    db.session.commit()
    print("Applications seeded successfully.")

if __name__ == "__main__":
    with app.app_context():
        clear_database()
        seed_categories()
        seed_skills()
        seed_users()
        seed_profiles()
        seed_jobs()
        seed_worker_skills()
        seed_applications()

        print("Database seeding completed successfully.")