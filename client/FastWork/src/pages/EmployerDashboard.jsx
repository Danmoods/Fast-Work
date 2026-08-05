import { useEffect, useState } from "react";
import axios from "axios";

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
    });

  axios
    .get("https://fast-work.onrender.com/categories")
    .then((response) => {
      setCategories(response.data);
    });

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
    alert("Failed to post job");
  }
};

const deleteJob = async (jobId) => {
  const token = localStorage.getItem("token");

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `https://fast-work.onrender.com/jobs/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Remove the deleted job from the page
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
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setApplications((prev) => ({
      ...prev,
      [Object.keys(prev).find((jobId) =>
        prev[jobId].some((app) => app.id === applicationId)
      )]: prev[
        Object.keys(prev).find((jobId) =>
          prev[jobId].some((app) => app.id === applicationId)
        )
      ].map((app) =>
        app.id === applicationId
          ? { ...app, status }
          : app
      ),
    }));

    alert(`Application ${status}!`);

  } catch (err) {
    console.error(err);
    alert("Failed to update application.");
  }
};

  return (
    <div style={{ padding: "40px" }}>
      <h1>Employer Dashboard</h1>

      {user && (
        <>
          <h2>Welcome {user.username} 👋</h2>

        <form
        onSubmit={postJob}
        style={{
            marginTop: 30,
            marginBottom: 30,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            maxWidth: 500,
        }}
        >
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

        <button type="submit">
            Post Job
        </button>
        </form>

          <hr />

          <h2>My Jobs</h2>

          {jobs.length === 0 ? (
            <p>You haven't posted any jobs yet.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                style={{
                  border: "1px solid gray",
                  padding: 20,
                  marginBottom: 20,
                  borderRadius: 10,
                }}
              >
                <h3>{job.title}</h3>

                <p>{job.description}</p>

                <p>
                  <strong>Salary:</strong> KES {job.salary}
                </p>

                <p>
                  <strong>Location:</strong> {job.location}
                </p>

                <hr />

                <h4>Applicants</h4>

                {applications[job.id]?.length > 0 ? (
                  applications[job.id].map((application) => (
                    <div
                      key={application.id}
                      style={{
                        border: "1px solid gray",
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                    >
                      <p>
                        <strong>Worker ID:</strong> {application.worker_id}
                      </p>

                      <p>
                        <strong>Status:</strong> {application.status}
                      </p>

                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={() =>
                            updateApplicationStatus(application.id, "accepted")
                          }
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            updateApplicationStatus(application.id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No applications yet.</p>
                )}
                <button
                onClick={() => deleteJob(job.id)}
                style={{
                    marginTop: "15px",
                    padding: "8px 15px",
                    cursor: "pointer",
                }}
                >
                Delete Job
                </button>
              </div>
            ))
          )}

          
        </>
      )}
    </div>
  );
}