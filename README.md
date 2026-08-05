# FastWork

FastWork is a job marketplace application built to connect skilled workers with employers looking for casual, flexible, or practical labor.

> **Live demo:** https://fast-work-black.vercel.app/

---

## What is FastWork?

FastWork provides a platform where:

- Employers can post job openings and review applicants
- Skilled workers can create profiles, showcase experience, and apply for jobs
- Both workers and employers see simple, clean dashboards for their role

This repository includes a Flask backend and a React frontend inside `client/FastWork`.

---

## Features

- Role-based users: worker and employer
- User registration and login
- Job posting and browsing
- Application tracking
- Profile management
- React frontend with reusable components
- Flask backend with database models and migrations

---

## Tech Stack

### Backend

- Python
- Flask
- Flask-RESTful
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-JWT-Extended
- Flask-CORS
- PostgreSQL
- python-dotenv

### Frontend

- React
- Vite
- React Router
- Axios / Fetch

---

## Project Structure

```text
FastWork/
├── client/FastWork/         # React frontend app
├── controllers/             # Route handler logic
├── extensions.py            # Flask extension setup
├── main.py                  # Flask application entry point
├── migrations/              # Alembic migration scripts
├── models/                  # SQLAlchemy data models
├── schemas/                 # Serialization schemas
├── requirements.txt         # Python dependencies
└── README.md                # Project documentation
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd FastWork
```

### 2. Backend setup

Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the project root with values like:

```env
FLASK_APP=main.py
FLASK_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/fastwork
JWT_SECRET_KEY=your_secret_key
```

Run the database migrations:

```bash
flask db upgrade
```

Start the backend server:

```bash
flask run
```

### 3. Frontend setup

Open a new terminal and run:

```bash
cd client/FastWork
npm install
npm run dev
```

The frontend should now be available at the local Vite URL shown in the terminal.

---

## Deployment

Vercel link
(https://fast-work.onrender.com/)
```

---

## Notes

- Make sure your database is running before starting the backend.
- If the backend runs on a different address or port, update the API base URL in `client/FastWork/src/services/api.js`.
- The project uses JWT for authentication, so the backend must be configured with a valid `JWT_SECRET_KEY`.

---

## Roadmap

- [x] Flask backend setup
- [x] Project structure and data modeling
- [ ] Complete SQLAlchemy models
- [ ] Implement authentication and authorization
- [ ] Build full REST API
- [ ] Finish React frontend polish
- [ ] Deploy frontend and backend

---

## Author

**Daniel Bett**

---

## Contact

saitamang1234@gmail.com

