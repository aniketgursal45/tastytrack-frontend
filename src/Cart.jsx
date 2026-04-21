import { useState } from 'react';
import './Cart.css';
import { useNavigate, Link } from 'react-router-dom';


export default function Cart() {
    const nav = useNavigate();


let[cart,setCart]=useState(()=>{
    const rawdata = localStorage.getItem("tastyCart");
    return rawdata ? JSON.parse(rawdata) : [];
})
    
    const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
    const total = subtotal;

    function handleRemove(id){

        let updatedCart=JSON.parse(localStorage.getItem("tastyCart"))||[];

        let cart=updatedCart.map((item)=>{
            if(item.id===id){
                if(item.quantity>1){
                    return {...item,quantity:item.quantity-1}
                }else{
                    return null;
                }
            }
            return item;
        }).filter((item)=>item!==null)

        setCart(cart);
        localStorage.setItem("tastyCart",JSON.stringify(cart));

    }

    return (
        <div className="cart-wrapper">
            
            <header className="cart-nav">
                <div className="nav-inner">
                    <h1 className="brand-logo"><span>Cart</span></h1>
                    <Link to="/UHome" className="back-link">← Back to Order</Link>
                </div>
            </header>

            <main className="cart-main">
                <div className="cart-layout">
                    
                    
                    <div className="bag-items-container">
                        <h2 className="bag-title">Your Cart</h2>
                        
                        {cart.length === 0 ? (
                            <div className="empty-state">Your cart is empty.</div>
                        ) : (
                            cart.map((item, index) => (
                                <div className="bag-card" key={index}>
                                    <div className="bag-img-box">
                                        <img src={item.img || item.image_path} alt={item.name} />
                                    </div>
                                    <div className="bag-details">
                                        <div className="bag-header-row">
                                            <h3>{item.name}</h3>
                                            <button className="remove-text-btn" onClick={()=>handleRemove(item.id)}>REMOVE</button>
                                        </div>
                                        <p className="pid">Product ID: {item.product_id || index + 1}</p>
                                        <p className="bag-price">Price: <span>₹{item.price}</span></p>
                                        <p className="quantity">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                   
                    <div className="summary-card">
                        <p className="summary-label">ORDER SUMMARY</p>
                        <div className="summary-line">
                            <span>Bag Total</span>
                            <span>₹{subtotal}.0</span>
                        </div>
                        <div className="summary-line">
                            <span>Delivery</span>
                            <span className="free-text">FREE</span>
                        </div>
                        <hr className="line-sep" />
                        <div className="summary-line total-line">
                            <span>Total Amount</span>
                            <span>₹{total}.0</span>
                        </div>
                        <button className="pay-button" onClick={() => nav('/payment')}>
                            PROCEED TO PAYMENT
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}
