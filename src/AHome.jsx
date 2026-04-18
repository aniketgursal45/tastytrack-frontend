import { useEffect, useState } from 'react';
import './AHome.css';
import { useNavigate } from 'react-router-dom';

export default function AHome() {
    const nav = useNavigate();

    
    useEffect(() => {
        let isAdmin = localStorage.getItem("isAdmin");
        if (isAdmin!=="ro45#264sj") {
            nav("/admin");
        }
    }, [nav]);

   

    return (
        <div className="admin-central-layout">
            <header className="admin-central-header">
                <h1>Tasty<span>Track</span> Admin</h1>
                <div className="panel-badge">MANAGEMENT PORTAL</div>
                <p className="welcome-msg">Welcome back! What would you like to manage today?</p>
            </header>

            <main className="admin-content-container">
                

                <div className="admin-action-grid">
                    <div className="admin-card" onClick={() => nav("/AProduct")}>
                        <div className="card-icon">➕</div>
                        <h3>Add New Product</h3>
                        <p>Upload new food items to the menu.</p>
                    </div>

                    <div className="admin-card" onClick={() => nav("/MProducts")}>
                        <div className="card-icon">🍕</div>
                        <h3>Manage Items</h3>
                        <p>Update prices, photos, and availability.</p>
                    </div>

                    <div className="admin-card" onClick={() => nav("/aOrder")}>
                        <div className="card-icon">🛍️</div>
                        <h3>View Orders</h3>
                        <p>Check recent sales and update status.</p>
                    </div>

                    <div className="admin-card" onClick={() => nav("/DUsers")}>
                        <div className="card-icon">👤</div>
                        <h3>View Users</h3>
                        <p>Manage customer accounts and data.</p>
                    </div>
                </div>

                <div className="logout-wrapper">
                    <button className="btn-logout-central" onClick={() => {
                        localStorage.removeItem("isAdmin");
                        nav("/admin");
                    }}>
                        LOGOUT SECURELY
                    </button>
                </div>
            </main>

            <footer className="admin-footer">
                © 2026 TastyTrack Control Center • Secure Admin Environment
            </footer>
        </div>
    );
}