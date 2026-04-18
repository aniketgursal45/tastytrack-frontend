import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

export default function OrderSuccess() {
    const nav = useNavigate();

    return (
        <div className="success-wrapper">
            <div className="success-card">
                <div className="success-icon-box">
                    <span className="confetti-icon">🎉</span>
                    <div className="check-mark">✓</div>
                </div>

                <h1 className="success-title">Order Placed!</h1>
                <p className="success-text">
                    Your delicious meal from <strong>TastyTrack</strong> is being prepared and will be delivered to you shortly.
                </p>

               

                <button className="home-btn" onClick={() => nav('/UHome')}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}