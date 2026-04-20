import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Payment() {
    const nav = useNavigate();

    let [order, setOrder] = useState({
        username: "",
        total_amount: "",
        number: "",
        pincode: "",
        city: ""

    })

    let [cart, setCart] = useState(() => {
        let rawdata = localStorage.getItem("tastyCart");
        return rawdata ? JSON.parse(rawdata) : [];
    })

    let [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        let total = 0;
        cart.map((item) => {
            total = total + (item.quantity * item.price);
        })
        setTotalCost(total);
    }, [])

    function handleInput(event) {

        setOrder((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })

    }

    function handleSub(event) {
        event.preventDefault();

        if (totalCost <= 0) {
            alert("Please first order something");
            return;
        }

        let userId = localStorage.getItem("userId");

        let finalData = {
            ...order, total_amount: totalCost > 99 ? totalCost : totalCost + 40,
            pincode: Number(order.pincode), user: {
                userId: Number(userId)
            }
        }

        let url = "https://tastytrack-backend-3mjg.onrender.com/user/sOrder"

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(finalData)
        }).then((res) => res.json()).then((data) => {
            if (data === true) {
                localStorage.setItem("tastyCart", JSON.stringify([]));
                nav("/oSuccess")
            } else {
                alert("something went wrong");
            }
        })
    }

    return (
        <div className="payment-wrapper">

            <header className="payment-nav">
                <div className="nav-inner">
                    <div className="nav-left">
                        <Link to="/cart" className="back-to-cart-link">← Back to Cart</Link>
                        <h1 className="brand-logo" onClick={() => nav('/UHome')}>
                            Tasty<span>Track</span>
                        </h1>
                    </div>
                    <span className="secure-badge">🔒 Secure Payment Simulation</span>
                </div>
            </header>


            <form onSubmit={handleSub} className="payment-main">
                <div className="payment-layout">


                    <div className="payment-form-section">


                        <div className="form-card">
                            <h2 className="step-title">1. Delivery Address</h2>
                            <div className="address-inputs">
                                <input type="text" name="username" onChange={handleInput} value={order.username} placeholder="Full Name" required />
                                <div className="row-input">
                                    <input type="text" name="pincode" onChange={handleInput} value={order.pincode} placeholder="Pincode" required />
                                    <input type="text" name="city" placeholder="Town / City" onChange={handleInput} value={order.city} required />
                                </div>
                                <input type="text" name="number" pattern="[0-9]{10}" maxLength="10" onChange={handleInput} value={order.number} placeholder="Mobile Number" required />
                                <input type="text" name="total_amount" onChange={handleInput} readOnly value={totalCost > 99 ? totalCost : totalCost + 40} required />
                            </div>
                        </div>


                        <div className="form-card">
                            <h2 className="step-title">2. Select Payment Method</h2>
                            <div className="method-grid">
                                <label className="method-option active">
                                    <input type="radio" name="pay" defaultChecked />
                                    <span className="icon">💳</span>
                                    <span className="label">CREDIT / DEBIT CARD</span>
                                </label>

                                <label className="method-option">
                                    <input type="radio" name="pay" />
                                    <span className="icon">📱</span>
                                    <span className="label">UPI / GOOGLE PAY</span>
                                </label>

                                <label className="method-option">
                                    <input type="radio" name="pay" />
                                    <span className="icon">💵</span>
                                    <span className="label">CASH ON DELIVERY</span>
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className="payment-summary-sidebar">
                        <div className="summary-card">
                            <h3>Order Summary</h3>

                            <div className="summary-line">
                                <span>Items Total</span>
                                <span>₹{totalCost}</span>
                            </div>

                            <div className="summary-line">
                                <span>Delivery Fee</span>
                                <span>{totalCost > 99 ? "Free Above ₹100 Rs order" : 40}</span>
                            </div>

                            <hr />

                            <div className="total-line">
                                <span>Total Amount</span>
                                <span>₹{totalCost > 99 ? totalCost : totalCost + 40}</span>
                            </div>

                            <button type="submit" className="place-order-btn">
                                PLACE ORDER
                            </button>

                            <Link to="/cart" className="modify-cart-btn-link">
                                REVIEW / MODIFY CART
                            </Link>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
}
