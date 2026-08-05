import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import Button from "../components/Button";

export default function WorkerDashboard() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [applications, setApplications] = useState([]);

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
            setJobs(response.data.jobs);
        })
        .catch(console.error);

    axios
        .get("https://fast-work.onrender.com/applications", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setApplications(response.data);
        })
        .catch(console.error);

    axios
        .get("https://fast-work.onrender.com/categories")
        .then((response) => {
            setCategories(response.data);
        })
        .catch(console.error);

    }, []);


  const applyForJob = async (jobId) => {

    const token = localStorage.getItem("token");

    try {

        await axios.post(
            "https://fast-work.onrender.com/applications",
            {
                job_id: jobId,
                cover_letter: "I am interested in this job."
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        alert("Application submitted successfully!");

    }
    catch(error){

        console.error(error);

        if(error.response){
            alert(error.response.data.message);
        }else{
            alert("Failed to apply.");
        }

    }

};


const withdrawApplication = async (id) => {
  const token = localStorage.getItem("token");

  if (!window.confirm("Withdraw this application?")) return;

  try {
    await axios.delete(
      `https://fast-work.onrender.com/applications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setApplications(
      applications.filter(
        (application) => application.id !== id
      )
    );

    alert("Application withdrawn successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to withdraw application.");
  }
};

const filteredJobs = jobs.filter((job) => {

  const matchesSearch =
    job.title.toLowerCase().includes(search.toLowerCase());

  const matchesCategory =
    selectedCategory === "" ||
    job.category_id === Number(selectedCategory);

  return matchesSearch && matchesCategory;

});

  return (
    <div style={{ padding: "40px" }}>
      {user && (
        <>
          <h1>Welcome {user.username} 👋</h1>

          <hr />

        <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
        }}
        />

        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
                width: "100%",
                padding: "10px",
                marginBottom: "20px",
            }}
            >
            <option value="">All Categories</option>

            {categories.map((category) => (
                <option
                key={category.id}
                value={category.id}
                >
                {category.name}
                </option>
            ))}
        </select>

          <h2>Available Jobs</h2>

          {jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            filteredJobs.length === 0 ? (
                <p>No jobs match your search.</p>
            ) : (
                filteredJobs.map((job) => (
                <JobCard
                    key={job.id}
                    title={job.title}
                    description={job.description}
                    salary={job.salary}
                    location={job.location}
                    >
                    <h3>{job.title}</h3>

                    <p>{job.description}</p>

                    <p>
                    <strong>Location:</strong> {job.location}
                    </p>

                    <p>
                    <strong>Salary:</strong> KES {job.salary}
                    </p>

                    <Button
                        text="Apply Now"
                        onClick={() => applyForJob(job.id)}
                    />
                </JobCard>
            ))
            )
          )}

          <hr />
          <h2>My Applications</h2>
          {applications.length === 0 ? (
            <p>You haven't applied for any jobs yet.</p>
            ) : (
            applications.map((application) => (
                <div
                key={application.id}
                style={{
                    border: "1px solid gray",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "20px",
                }}
                >
                <p>
                    <strong>Job ID:</strong> {application.job_id}
                </p>

                <p>
                    <strong>Status:</strong> {application.status}
                </p>

                <p>{application.cover_letter}</p>

                <button
                    onClick={() => withdrawApplication(application.id)}
                >
                    Withdraw
                </button>
            </div>
            ))
            )}
        </>
      )}
    </div>
  );
}