import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fast-work.onrender.com/jobs/${id}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch(console.error);
  }, [id]);

  const applyForJob = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://fast-work.onrender.com/applications",
        {
          job_id: job.id,
          cover_letter: "I am interested in this job.",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Application submitted successfully!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Failed to apply.");
      }
    }
  };

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="dashboard">
          <h2>Loading...</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="job-card">

          <h1>{job.title}</h1>

          <p><strong>Location:</strong> {job.location}</p>

          <p><strong>Salary:</strong> KES {job.salary}</p>

          <p><strong>Category ID:</strong> {job.category_id}</p>

          <hr />

          <h3>Job Description</h3>

          <p>{job.description}</p>

          <hr />

          <Button
            text="Apply Now"
            onClick={applyForJob}
          />

        </div>

      </div>

      <Footer />
    </>
  );
}