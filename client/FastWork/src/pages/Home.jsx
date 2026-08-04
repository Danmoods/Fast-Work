import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api
      .get("/jobs")
      .then((response) => {
        setJobs(response.data.jobs || response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>FastWork Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <p>
              <strong>Salary:</strong> KES {job.salary}
            </p>

            <Link to={`/jobs/${job.id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;