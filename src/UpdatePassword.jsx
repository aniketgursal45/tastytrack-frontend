import { Link } from 'react-router-dom';
import './UpdatePassword.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdatePassword() {

    let navigate=useNavigate();

    let [uPass, setPass] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    function handleUpdate(event) {
        setPass((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }

    function handleSub(event) {
        event.preventDefault();
        const url = "https://tastytrack-backend-3mjg.onrender.com/updatePass";

        if (uPass.password !== uPass.confirmPassword) {
            return alert("passwords do not match")
        }

        if (uPass.password.length < 8) {
            return alert("password must be 8 characters or more")
        }

        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(uPass)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data === true) {
                alert("password updated successfully");
                navigate("/login");
                setPass({
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
            } else {
                alert("something went wrong");
            }
        })
    }

    return (
        <div className="update-password-container">
            <div className="update-card">
                <div className="form-header">
                    <h3>Tasty<span>Track</span></h3>
                    <h2>New Password</h2>
                    <p>Please enter your email and a strong new password</p>
                </div>

                <form onSubmit={handleSub}>
                    <div className="input-box">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={uPass.email} 
                            onChange={handleUpdate} 
                            placeholder="name@example.com" 
                            required 
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="newPass">New Password</label>
                        <input 
                            type="password" 
                            id="newPass" 
                            name="password" 
                            value={uPass.password} 
                            onChange={handleUpdate} 
                            placeholder="••••••••" 
                            required 
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="confirmPass">Re-enter New Password</label>
                        <input 
                            type="password" 
                            id="confirmPass" 
                            name="confirmPassword" 
                            value={uPass.confirmPassword} 
                            onChange={handleUpdate} 
                            placeholder="••••••••" 
                            required 
                        />
                    </div>

                    <button type="submit" className="update-btn">Update Password</button>

                    <p className="cancel-link">
                        <Link to="/login">Cancel and go back</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
