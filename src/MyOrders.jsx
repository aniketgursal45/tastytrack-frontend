import React, { useEffect, useState } from 'react';
import './MyOrders.css';
import { useNavigate, Link } from 'react-router-dom';

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const nav = useNavigate();

   
    useEffect(() => {

        let userid=localStorage.getItem("userId");

        fetch(`http://localhost:8080/user/getOrders/${userid}`) 
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setOrders(data);
            })
            
    }, []);

    return (
        <div className="orders-wrapper">
            <header className="orders-nav">
                <div className="nav-inner">
                    <h1 className="brand-logo" onClick={() => nav('/UHome')}>Tasty<span>Track</span></h1>
                    <Link to="/UHome" className="back-link">← Back to Menu</Link>
                </div>
            </header>

            <main className="orders-main">
                <h2 className="page-title">My Orders</h2>

                {orders.length === 0 ? (
                    <div className="empty-orders">
                        <p>No orders found. Time to grab some food!</p>
                        <button onClick={() => nav('/UHome')}>Order Now</button>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <div className="order-card" key={order.order_id}>
                                <div className="order-header">
                                    <div className="order-id-group">
                                        <span className="order-label">ORDER ID</span>
                                        <span className="order-id">#TT-{order.order_id}</span>
                                    </div>
                                    <div className={`status-pill ${order.order_status.toLowerCase()}`}>
                                        {order.order_status}
                                    </div>
                                </div>

                                <div className="order-body">
                                    <div className="info-section">
                                        <p className="info-label">Date & Time</p>
                                        <p className="info-value">{new Date(order.order_date).toLocaleString()}</p>
                                    </div>
                                    <div className="info-section">
                                        <p className="info-label">Deliver to</p>
                                        <p className="info-value">{order.city}, {order.pincode}</p>
                                    </div>
                                    <div className="info-section">
                                        <p className="info-label">Contact</p>
                                        <p className="info-value">{order.number}</p>
                                    </div>
                                    <div className="info-section price-section">
                                        <p className="info-label">Total Amount</p>
                                        <p className="total-price">₹{order.total_amount}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}