import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

export default function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            "https://fast-work.onrender.com/auth/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => {
            setUser(response.data);
        })
        .catch(console.error);

    }, []);

    return (

        <>
            <Navbar />

            <div className="dashboard">

                <h1>My Profile</h1>

                {!user ? (

                    <p>Loading...</p>

                ) : (

                    <div className="job-card">

                        <h2>{user.username}</h2>

                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>

                        <p>
                            <strong>Role:</strong> {user.role}
                        </p>

                        <p>
                          <strong>Joined:</strong>{" "}
                          {new Date(user.created_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>

                        <Button
                            text="Edit Profile"
                            color="#2563eb"
                        />

                    </div>

                )}

            </div>

            <Footer />
        </>

    );

}