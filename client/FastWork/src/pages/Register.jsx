import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("worker");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            await axios.post(
                "https://fast-work.onrender.com/auth/register",
                {
                    username,
                    email,
                    password,
                    role
                }
            );

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Registration failed.");
            }

        }
    };

    return (

        <div
            style={{
                width: "400px",
                margin: "60px auto"
            }}
        >

            <h1>Register</h1>

            <form
                onSubmit={handleRegister}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px"
                }}
            >

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <select
                    value={role}
                    onChange={(e)=>setRole(e.target.value)}
                >

                    <option value="worker">
                        Worker
                    </option>

                    <option value="employer">
                        Employer
                    </option>

                </select>

                <button type="submit">
                    Register
                </button>

            </form>

        </div>

    );

}