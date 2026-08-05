import { Link } from "react-router-dom";

export default function Navbar(){

    return(

        <div className="navbar">

            <div className="logo">

                FastWork

            </div>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/profile">Profile</Link>

                <Link to="/login">Logout</Link>

            </div>

        </div>

    );

}