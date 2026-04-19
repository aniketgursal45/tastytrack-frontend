import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    let [user, setUser] = useState({
        email: "",
        securityQuestion: "",
        securityAnswer: ""
    })
    const navigate = useNavigate();


    function handleUser(event) {

        setUser((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })

    }

    function handlesub(event) {
        event.preventDefault();

        const url = "https://tastytrack-backend-3mjg.onrender.com/verifyforget";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data === true) {
                 navigate("/updatepassword");
            } else {
                alert("Wrong credential");
            }
            setUser({
                email: "",
                securityQuestion: "",
                securityAnswer: ""
            })
        })


    }


    return (
        <div className="forgot-password-container">
            <div className="recovery-card">
                <div className="form-header">
                    <h3>Tasty<span>Track</span></h3>
                    <h2>Reset Password</h2>
                    <p>Verify your identity to recover your account</p>
                </div>

                <form onSubmit={handlesub}>
                    <div className="input-box">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" value={user.email} onChange={handleUser} placeholder="Enter your registered email" required />
                    </div>

                    <div className="input-box">
                        <label htmlFor="sq">Security Question</label>
                        <select name="securityQuestion" value={user.securityQuestion} onChange={handleUser} required id="sq">
                            <option value="" disabled>Select your security question</option>
                            <option value="pet">What was the name of your first pet?</option>
                            <option value="school">What was the name of your primary school?</option>
                            <option value="city">In what city were you born?</option>
                            <option value="nickname">What was your childhood nickname?</option>
                            <option value="car">What was your first car?</option>
                        </select>
                    </div>

                    <div className="input-box">
                        <label htmlFor="sa">Security Answer</label>
                        <input type="text" id="sa" name="securityAnswer" value={user.securityAnswer} onChange={handleUser} placeholder="Enter your answer" required />
                    </div>

                    <button type="submit" className="verify-btn">Verify Identity</button>

                    <p className="back-to-login">
                        Remembered your password? <Link to="/login">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
