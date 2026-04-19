import { useEffect, useState } from 'react';
import './UHome.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function UHome() {

    let nav=useNavigate();

    useEffect(() => {
    let userId = localStorage.getItem("userId");

    if (!userId) {
        nav("/login"); 
    }
}, []);



    useEffect(() => {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");

        fetch(`https://tastytrack-backend-3mjg.onrender.com/user/getId/${username}/${password}`)
            .then(res => res.json())
            .then((id) => {
                localStorage.setItem("userId", id); 
                console.log(id);
            });
    }, [])

    const categories = [
        { name: 'Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&h=200&auto=format&fit=crop' },
        { name: 'Burger', img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=200&h=200&auto=format&fit=crop' },
        { name: 'Biryani', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=200&h=200&auto=format&fit=crop' },
        { name: 'Chinese', img: 'https://images.unsplash.com/flagged/photo-1556742524-750f2ab99913?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D' },
        { name: 'South Indian', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=200&h=200&auto=format&fit=crop' },
        { name: 'Desserts', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=200&h=200&auto=format&fit=crop' },
        { name: 'Rolls', img: 'https://images.unsplash.com/photo-1626028937276-825810a384b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Um9sbHMlMjBmb29kfGVufDB8fDB8fHww' },
        { name: 'Thali', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=200&h=200&auto=format&fit=crop' }
    ];

    let [product, setProduct] = useState([]);

    let [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("tastyCart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    let url = "https://tastytrack-backend-3mjg.onrender.com/user/getProduct";

    function handleCart(id, name, img, des, price, cat) {
        const newItem = { id, name, img, des, price, cat, quantity: 1 };
        setCart((prev) => {
            let existItem = prev.find((item) => item.id === id);
            if (existItem) {
                let updatedCart = prev.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    return item;
                });
                localStorage.setItem("tastyCart", JSON.stringify(updatedCart));
                return updatedCart;
            } else {
                let updatedCart = [...prev, newItem];
                localStorage.setItem("tastyCart", JSON.stringify(updatedCart));
                return updatedCart;
            }
        });
    }

    function handleRemove(id) {
        let updatedCart = JSON.parse(localStorage.getItem("tastyCart")) || [];
        let cart = updatedCart.map((item) => {
            if (item.id === id) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 }
                } else {
                    return null;
                }
            }
            return item;
        }).filter((item) => item !== null);
        setCart(cart);
        localStorage.setItem("tastyCart", JSON.stringify(cart));
    }

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
            });
    }, []);

    return (
        <div className="uhome-wrapper">
            <nav className="top-nav">
                <div className="nav-container">
                    <div className="logo-group">
                        <div className="logo">Tasty<span>Track</span></div>
                    </div>

                    

                    <div className="nav-actions">
                        <Link to="/myorders" className="nav-btn-link">My Orders</Link>
                        <Link to="/cart" className="cart-anchor">
                            🛒 <span className="badge">{count}</span>
                        </Link>
                        <Link to="/login" onClick={() => { localStorage.clear() }} className="logout-btn-nav">Logout</Link>
                    </div>
                </div>
            </nav>

            <main className="content-area">
                <section className="category-section">
                    <h2 className="section-title">What's on your mind?</h2>
                    <div className="category-list">
                        {categories.map((cat, index) => (
                            <div className="category-item" key={index}>
                                <div className="img-circle">
                                    <img src={cat.img} alt={cat.name} />
                                </div>
                                <p>{cat.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="food-listing">
                    <div className="food-grid">
                        {product.map((food) => (
                            <div className="food-card" key={food.product_id}>
                                <div className="image-container">
                                    <img src={food.image_path} alt={food.name} />
                                    <span className="category-badge-tag">{food.category}</span>
                                </div>
                                <div className="food-details">
                                    <div className="title-line">
                                        <h3>{food.name}</h3>
                                        <span className="rating-pill">4.2 ★</span>
                                    </div>
                                    <p className="description">{food.description}</p>
                                    <div className="footer-line">
                                        <span className="price-text">₹{food.price}</span>
                                        <div className="action-buttons-container">
                                            <button className="add-button" onClick={() => handleCart(food.product_id, food.name, food.image_path, food.description, food.price, food.category)}>
                                                ADD +
                                            </button>
                                            <button className="remove-btn-small" onClick={() => handleRemove(food.product_id)}>
                                                REMOVE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
