import { useState } from 'react';
import './SignUp.css';
import { Link } from "react-router-dom";


export default function SignUp() {

   
    const [loading, setLoading] = useState(false);
    
    let [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        securityQuestion: "",
        securityAnswer: ""
    })

    function handleUser(event) {

        setUser((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })



    }


    function handleSub(event) {

        event.preventDefault();

        if(!user.email.endsWith("@gmail.com")){
            return  alert("Enter valid Gmail");
        }

         if (user.password.length < 8) {
            return alert("password must be 8 characters or more")
        }

        setLoading(true);
        const url = "https://tastytrack-backend-3mjg.onrender.com/save";

        fetch(url, {
            method: 'Post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.text()).then(data => {
            alert(data);
            setUser({
                username: "",
                email: "",
                password: "",
                securityQuestion: "",
                securityAnswer: ""
            })
        }).catch(err => console.log(err)).finally(() => {
            setLoading(false); 
        });



    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="image-side">
                    <div className="image-content">
                        <h2>Join the Club.</h2>
                        <p>Experience the best flavors with TastyTrack.</p>
                    </div>
                </div>

                <div className="form-side">
                    <div className="form-header">
                        <h3>Tasty<span>Track</span></h3>
                        <h2>Create Account</h2>
                        <p>Join for the best experience.</p>
                    </div>

                    <form onSubmit={handleSub}>
                        <div className="input-box">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="username" placeholder="Aniket" value={user.username} required onChange={handleUser} />
                        </div>

                        <div className="input-box">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={user.email} placeholder="name@example.com" required onChange={handleUser} />
                        </div>

                        <div className="input-box">
                            <label htmlFor="pass">Password</label>
                            <input type="password" id="pass" name="password" value={user.password} placeholder="••••••••" required onChange={handleUser} />
                        </div>

                        <div className="input-box">
                            <label htmlFor="sq">Security Question</label>
                            <select name="securityQuestion" required id="sq" value={user.securityQuestion} onChange={handleUser} defaultValue="">
                                <option value="" disabled>Select a question for recovery</option>
                                <option value="pet">What was the name of your first pet?</option>
                                <option value="school">What was the name of your primary school?</option>
                                <option value="city">In what city were you born?</option>
                                <option value="nickname">What was your childhood nickname?</option>
                                <option value="car">What was your first car?</option>
                            </select>
                        </div>

                        <div className="input-box">
                            <label htmlFor="sa">Security Answer</label>
                            <input type="text" required id="sa" name="securityAnswer" value={user.securityAnswer} placeholder="Your answer" onChange={handleUser} />
                        </div>

                       <button type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                            {loading ? "Connecting to Server..." : "Register & Shop"}
                        </button>

                        {loading && (
                            <p style={{ color: '#ff9800', fontSize: '0.85rem', marginTop: '10px', textAlign: 'center' }}>
                                ⏳ Waking up the server... Please wait (up to 60s)
                            </p>
                        )}

                        <p className="login-text">
                            Already have an account? <Link to="/login">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
