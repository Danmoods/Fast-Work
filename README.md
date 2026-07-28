# FastWork

A full-stack job marketplace application that connects skilled workers with employers looking for casual and skilled labor opportunities.

> **Status:** 🚧 Backend Foundation & Database Design in Progress

---

## Project Overview

FastWork is a web application designed to bridge the gap between employers and skilled workers who may not have formal academic qualifications but possess valuable practical skills.

Employers can post jobs, while workers can create profiles, showcase their skills, and apply for available opportunities.

---

## Current Progress

### ✅ Completed

- Flask project initialized
- Virtual environment configured
- Project structure organized
- Flask extensions configured
- Database migration setup
- Models folder created
- Controllers folder created
- Schemas folder created
- Initial database models scaffolded
- ERD designed

### 🚧 In Progress

- Building SQLAlchemy models
- Database relationships
- Authentication with JWT

### 📌 Planned

- REST API endpoints
- User authentication & authorization
- CRUD operations
- React frontend
- Job application workflow
- Deployment

---

# Tech Stack

### Backend

- Python
- Flask
- Flask-RESTful
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-JWT-Extended
- Flask-CORS
- PostgreSQL
- Python Dotenv

### Frontend (Planned)

- React
- Vite
- Fetch API

---

# Project Structure

```text
FastWork/
│
├── controllers/
│   └── .keep
│
├── migrations/
│
├── models/
│   ├── __init__.py
│   ├── application.py
│   ├── job.py
│   ├── job_category.py
│   ├── profile.py
│   ├── skills.py
│   ├── user.py
│   └── worker_skills.py
│
├── schemas/
│   └── .keep
│
├── extensions.py
├── main.py
├── requirements.txt
└── README.md
```

---

# Database Design

Current entities include:

- User
- Profile
- Job
- Job Category
- Skill
- Worker Skill
- Application

Relationships:

- User ↔ Profile (One-to-One)
- User → Job (One-to-Many)
- Job Category → Job (One-to-Many)
- User ↔ Skill (Many-to-Many via WorkerSkill)
- User ↔ Job (Many-to-Many via Application)

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate into the project

```bash
cd FastWork
```

Create a virtual environment

```bash
python -m venv venv
```

Activate the virtual environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

# Current Dependencies

- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-JWT-Extended
- Flask-CORS
- Flask-RESTful
- python-dotenv
- psycopg2-binary

---

# Roadmap

- [x] Backend setup
- [x] Project architecture
- [x] ERD design
- [ ] SQLAlchemy models
- [ ] Database migrations
- [ ] JWT Authentication
- [ ] Authorization
- [ ] REST API
- [ ] React Frontend
- [ ] Deployment

---

# Author

**Daniel Bett**
