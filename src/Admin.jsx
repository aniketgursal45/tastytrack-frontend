import { Link } from 'react-router-dom';
import './Admin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const [loading, setLoading] = useState(false);
    let nav = useNavigate();
    let [uadmin, setUadmin] = useState({
        adminUser: "",
        adminPassword: ""
    })

    function handleChange(event) {
        setUadmin((pre) => {
            return { ...pre, [event.target.name]: event.target.value }
        })
    }

    function handlesub(event) {
        event.preventDefault();
        setLoading(true);

        let url = "https://tastytrack-backend-3mjg.onrender.com/verifyadmin"

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(uadmin)
        }).then((res)=>res.json()).then((data) => {
            if (data) {
                localStorage.setItem("isAdmin", "ro45#264sj");
                nav("/AHome");
            } else {
                alert("wrong credential");
            }
            setUadmin({
                adminUser: "",
                adminPassword: ""
            })
        }).catch((err) => {
            console.log(err);
            alert("Admin server is waking up... please wait.");
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="admin-login-container">
            <div className="admin-card">
                <div className="admin-badge">Admin Portal</div>

                <div className="form-header">
                    <h3>Tasty<span>Track</span></h3>
                    <h2>Manager Login</h2>
                    <p>Access the control panel to manage orders</p>
                </div>

                <form onSubmit={handlesub}>
                    <div className="input-box">
                        <label htmlFor="adminUser">Admin Username</label>
                        <input type="text" id="adminUser" name="adminUser" placeholder="e.g. admin_aniket" required value={uadmin.adminUser} onChange={handleChange} />
                    </div>

                    <div className="input-box">
                        <label htmlFor="adminPass">Admin Password</label>
                        <input type="password" id="adminPass" name="adminPassword" placeholder="••••••••" required value={uadmin.adminPassword} onChange={handleChange} />
                    </div>

                    <button type="submit" className="admin-btn" disabled={loading}>
                        {loading ? "Verifying..." : "Verify & Enter"}
                    </button>

                    {loading && (
                        <p style={{ color: 'orange', textAlign: 'center', marginTop: '10px' }}>
                            ⏳ Waking up Admin Services...
                        </p>
                    )}

                    <p className="back-link">
                        <Link to="/login">← Back to Customer Site</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
