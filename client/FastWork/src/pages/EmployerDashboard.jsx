import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import ApplicantCard from "../components/ApplicantCard";
import Button from "../components/Button";

export default function EmployerDashboard() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState([]);
  const [applications, setApplications] = useState({});

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    setUser(savedUser);

    axios
      .get("https://fast-work.onrender.com/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const myJobs = response.data.jobs.filter(
          (job) => job.employer_id === savedUser.id
        );

        setJobs(myJobs);

        myJobs.forEach((job) => {
          axios
            .get(
              `https://fast-work.onrender.com/applications/job/${job.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setApplications((prev) => ({
                ...prev,
                [job.id]: res.data,
              }));
            })
            .catch(console.error);
        });
      })
      .catch(console.error);

    axios
      .get("https://fast-work.onrender.com/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch(console.error);
  }, []);

  const postJob = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://fast-work.onrender.com/jobs",
        {
          title,
          description,
          salary,
          location,
          category_id: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job posted successfully!");

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to post job.");
    }
  };

  const deleteJob = async (jobId) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(
        `https://fast-work.onrender.com/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(jobs.filter((job) => job.id !== jobId));

      alert("Job deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete job.");
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    const token = localStorage.getItem("token");

    try {
      await axios.patch(
        `https://fast-work.onrender.com/applications/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((jobId) => {
          updated[jobId] = updated[jobId].map((app) =>
            app.id === applicationId
              ? { ...app, status }
              : app
          );
        });

        return updated;
      });

      alert(`Application ${status}!`);
    } catch (err) {
      console.error(err);
      alert("Failed to update application.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <h1>Employer Dashboard</h1>

        {user && <h2>Welcome {user.username} 👋</h2>}

        <form onSubmit={postJob} className="job-form">

          <h2>Post New Job</h2>

          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <Button
            text="Post Job"
            color="#2563eb"
            type="submit"
          />

        </form>

        <hr />

        <h2>My Jobs</h2>

        {jobs.length === 0 ? (
          <p>You haven't posted any jobs yet.</p>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              description={job.description}
              salary={job.salary}
              location={job.location}
            >
              <hr />

              <h4>Applicants</h4>

              {applications[job.id]?.length > 0 ? (
                applications[job.id].map((application) => (
                  <ApplicantCard
                    key={application.id}
                    workerId={application.worker_id}
                    status={application.status}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        marginTop: "15px",
                      }}
                    >
                      <Button
                        text="Accept"
                        color="green"
                        onClick={() =>
                          updateApplicationStatus(
                            application.id,
                            "accepted"
                          )
                        }
                      />

                      <Button
                        text="Reject"
                        color="red"
                        onClick={() =>
                          updateApplicationStatus(
                            application.id,
                            "rejected"
                          )
                        }
                      />
                    </div>
                  </ApplicantCard>
                ))
              ) : (
                <p>No applications yet.</p>
              )}

              <Button
                text="Delete Job"
                color="#dc2626"
                onClick={() => deleteJob(job.id)}
              />
            </JobCard>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}