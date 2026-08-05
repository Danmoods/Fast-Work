import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function WorkerDetails() {

  const { id } = useParams();

  const [worker, setWorker] = useState(null);

  const [skills, setSkills] = useState([]);

  useEffect(() => {

    axios
      .get(`https://fast-work.onrender.com/users/${id}`)
      .then((res) => {
        setWorker(res.data);
      })

    axios
    .get(`https://fast-work.onrender.com/worker-skills/${id}`)
    .then((res) => {
      setSkills(res.data);
    })
      .catch(console.error);

  }, [id]);

  if (!worker) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="job-card">

          <h1>{worker.username}</h1>

          <p>
            <strong>Email:</strong> {worker.email}
          </p>

          <p>
            <strong>Role:</strong> {worker.role}
          </p>

          <h3>Skills</h3>

          {skills.length === 0 ? (
              <p>No skills added.</p>
          ) : (
              <ul>
                  {skills.map((item) => (
                      <li key={item.id}>
                          {item.skill.name}
                      </li>
                  ))}
              </ul>
          )}

        </div>

      </div>

      <Footer />

    </>
  );
}