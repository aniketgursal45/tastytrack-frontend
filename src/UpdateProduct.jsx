import { useState } from 'react';
import './UpdateProduct.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function UpdateProduct() {

    const { id } = useParams();

    let nav=useNavigate();

    let [uProduct, setProduct] = useState({

        product_id: id,
        name: "",
        category: "",
        description: "",
        price: "",
        image_path: ""
    });


    function handleUpdate(event) {

        setProduct((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }


    function handlesub(event) {
        event.preventDefault();

        const url = "http://localhost:8080/admin/uProduct";

        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...uProduct,product_id:Number(id),price:Number(uProduct.price)
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data === true) {
                alert("Product Updated");
            } else {
                alert("something went wrong");
            }
            setProduct({
                product_id: id,
                name: "",
                category: "",
                description: "",
                price: "",
                image_path: ""
            })
        })
    }

    return (
        <div className="update-container">
            <div className="update-card">
                <div className="admin-badge">Inventory Control</div>

                <div className="form-header">
                    <h3>Tasty<span>Track</span></h3>
                    <h2>Update Product</h2>
                    <p>Modify existing product details below</p>
                </div>

                <form onSubmit={handlesub}>
                    <div className="input-box">
                        <label htmlFor="productId">Target Product ID</label>
                        <input
                            type="number"
                            id="productId"
                            name="product_id"
                            value={id}
                            placeholder="Enter the ID"
                            className="id-focus-input"
                            readOnly
                            required
                        />
                    </div>

                    <div className="divider"><span>New Details</span></div>

                    <div className="input-group">
                        <div className="input-box">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" id="name" name="name" placeholder="Name" onChange={handleUpdate} value={uProduct.name} required />
                        </div>

                        <div className="input-box">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category" onChange={handleUpdate} value={uProduct.category} required>
                                <option value="" disabled >Select</option>
                                <option value="Veg">Pure Veg</option>
                                <option value="Non-Veg">Non-Veg</option>
                                <option value="Fast Food">Fast Food</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Beverage">Beverage</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-box">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" placeholder="Description details..."  onChange={handleUpdate} value={uProduct.description} required/>
                    </div>

                    <div className="input-group">
                        <div className="input-box">
                            <label htmlFor="price">Price (₹)</label>
                            <input type="number" id="price" name="price" placeholder="Amount" onChange={handleUpdate} value={uProduct.price} required />
                        </div>

                        <div className="input-box">
                            <label htmlFor="image_path">Image URL</label>
                            <input type="text" id="image_path" name="image_path" placeholder="Link" onChange={handleUpdate} value={uProduct.image_path} required/>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button type="submit" className="save-btn">Save Changes</button>
                        <button type="button" className="cancel-btn" onClick={()=>{nav("/MProducts")}}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}