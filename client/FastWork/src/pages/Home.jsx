import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import Button from "../components/Button";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);

    api
      .get("/jobs")
      .then((response) => {
        setJobs(response.data.jobs || response.data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">

        {/* Hero Section */}

        <h1>Welcome to FastWork 🚀</h1>

        <p
          style={{
            textAlign: "center",
            maxWidth: "600px",
            margin: "20px auto",
          }}
        >
          Connecting skilled workers with employers quickly,
          easily and securely.
        </p>

        {/* Quick Navigation */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >

          <Link to="/login">
            <Button text="Login" />
          </Link>

          <Link to="/register">
            <Button text="Register" />
          </Link>

          {user && user.role === "worker" && (
            <Link to="/worker-dashboard">
              <Button text="Worker Dashboard" />
            </Link>
          )}

          {user && user.role === "employer" && (
            <Link to="/employer-dashboard">
              <Button text="Employer Dashboard" />
            </Link>
          )}

          {user && (
            <Link to="/profile">
              <Button text="My Profile" />
            </Link>
          )}

        </div>

        <hr />

        <h2>Available Jobs</h2>

        {jobs.length === 0 ? (
          <p>No jobs available.</p>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              description={job.description}
              salary={job.salary}
              location={job.location}
            >
              <Link to={`/job/${job.id}`}>
                <Button text="View Details" />
              </Link>
            </JobCard>
          ))
        )}

      </div>

      <Footer />
    </>
  );
}

export default Home;