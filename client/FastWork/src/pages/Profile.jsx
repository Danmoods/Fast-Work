import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

export default function Profile() {

    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);

    const [phone, setPhone] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

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
        axios
          .get("https://fast-work.onrender.com/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setPhone(res.data.phone || "");
            setBio(res.data.bio || "");
            setLocation(res.data.location || "");
            setProfilePhoto(res.data.profile_photo || "");
          })
          .catch(console.error);

    }, []);


    const saveProfile = async () => {
  const token = localStorage.getItem("token");

  try {
    await axios.patch(
      "https://fast-work.onrender.com/profile",
      {
        phone,
        bio,
        location,
        profile_photo: profilePhoto,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Profile updated successfully!");

    setEditing(false);

  } catch (err) {
    console.error(err);
    alert("Failed to update profile.");
  }
};

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

                        <div className="job-card">

                            <h2>{user.username}</h2>

                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>

                            <p>
                                <strong>Role:</strong> {user.role}
                            </p>

                            {/* ADD THESE HERE */}

                            <p>
                                <strong>Phone:</strong> {phone || "Not provided"}
                            </p>

                            <p>
                                <strong>Location:</strong> {location || "Not provided"}
                            </p>

                            <p>
                                <strong>Bio:</strong> {bio || "No bio yet"}
                            </p>

                            {profilePhoto && (
                                <img
                                    src={profilePhoto}
                                    alt="Profile"
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginTop: "15px",
                                    }}
                                />
                            )}

                            {/* END OF NEW CODE */}

                            <p>
                                <strong>Joined:</strong> {user.created_at}
                            </p>

                            <Button
                                text={editing ? "Cancel" : "Edit Profile"}
                                color="#2563eb"
                                onClick={() => setEditing(!editing)}
                            />

                            {/* Edit form continues here */}

                        </div>


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
                            onClick={() => setEditing(true)}
                        />
                        {editing && (

                        <div style={{ marginTop: "20px" }}>

                            <input
                                type="text"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={(e)=>setLocation(e.target.value)}
                            />

                            <textarea
                                placeholder="Bio"
                                value={bio}
                                onChange={(e)=>setBio(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Profile Photo URL"
                                value={profilePhoto}
                                onChange={(e)=>setProfilePhoto(e.target.value)}
                            />

                            <Button
                                text="Save Profile"
                                color="green"
                                onClick={saveProfile}
                            />

                        </div>

                        )}

                    </div>

                )}

            </div>

            <Footer />
        </>

    );

}