import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ApplicantCard({
  workerId,
  status,
  children,
}) {
  const [worker, setWorker] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://fast-work.onrender.com/users/${workerId}`)
      .then((res) => {
        setWorker(res.data);
      })
      .catch(console.error);
  }, [workerId]);

  return (
    <div
        className="job-card"
        onClick={() => navigate(`/worker/${workerId}`)}
        style={{ cursor: "pointer" }}
        >

      {worker ? (
        <>
          <h3>{worker.username}</h3>

          <p>{worker.email}</p>
        </>
      ) : (
        <p>Loading worker...</p>
      )}

      <p>
        <strong>Status:</strong> {status}
      </p>

      {children}

    </div>
  );
}