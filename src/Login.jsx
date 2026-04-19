import { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    let nav = useNavigate();

    let [userlog, setUserlog] = useState({
        username: "",
        password: ""
    })

    function handleUser(event) {

        setUserlog((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })


    }

    function handlesub(event) {
        event.preventDefault();

        const url = "https://tastytrack-backend-3mjg.onrender.com/verifyLogin";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userlog)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data === true) {
                localStorage.setItem("username", userlog.username);
                localStorage.setItem("password", userlog.password);
                nav("/UHome");
            } else {
                alert("Wrong credential");
            }
            setUserlog({
                username: "",
                password: ""
            })
        })


    }




    return (
        <div className="login-container">
            <div className="login-card">
                <div className="form-header">
                    <h3>Tasty<span>Track</span></h3>
                    <h2>Login</h2>
                    <p>Enter your details to access your account</p>
                </div>

                <form onSubmit={handlesub}>
                    <div className="input-box">
                        <label htmlFor="user">Username</label>
                        <input type="text" id="user" name="username" placeholder="Enter your username" value={userlog.username} onChange={handleUser} required />
                    </div>

                    <div className="input-box">
                        <label htmlFor="pass">Password</label>
                        <input type="password" id="pass" name="password" onChange={handleUser} value={userlog.password} placeholder="••••••••" required />
                    </div>

                    <div className="forgot-pass">
                        <Link to="/forgetpass">Forgot Password?</Link>
                    </div>

                    <button type="submit">Login & Explore</button>

                    <p className="signup-text">
                        Don't have an account? <Link to="/">Create one here</Link>
                    </p>

                    <div className="admin-redirect">
                        <p>Are you an employee? <Link to="/admin">Admin Portal</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
