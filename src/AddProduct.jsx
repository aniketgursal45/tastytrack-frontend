import { useState } from 'react';
import './AddProduct.css';

export default function AddProduct() {

    let[prod,setProduct]=useState({
        name:"",
        category:"",
        description:"",
        price:"",
        image_path:""
    })

    function handleInput(event){

        setProduct((prev)=>{
            return {...prev,[event.target.name]:event.target.value}
        })
    }

    function handlesub(event){

        event.preventDefault();

        const url="https://tastytrack-backend-3mjg.onrender.com/admin/";

        fetch(url+"AProduct",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(prod)
        }).then((res)=>res.json()).then((data)=>{
            if(data===true){
                alert("Product added")
            }
        }).catch((err)=> alert("Something went wrong"))

    }



    return (
        <div className="add-product-container">
            <div className="add-product-card">
                <div className="admin-badge">Inventory Management</div>
                
                <div className="form-header">
                    <h3>Tasty<span>Track</span></h3>
                    <h2>Add New Item</h2>
                    <p>Enter food details to update the menu</p>
                </div>

                <form onSubmit={handlesub}>
                    <div className="input-group">
                        <div className="input-box">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" id="name" name="name" placeholder="e.g. Paneer Butter Masala" required  onChange={handleInput} value={prod.name}/>
                        </div>
                        
                        <div className="input-box">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category" required onChange={handleInput} value={prod.category}>
                                <option value="" disabled>Select Category</option>
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
                        <textarea id="description" name="description" placeholder="Briefly describe the taste and ingredients..." required onChange={handleInput} value={prod.description}/>
                    </div>

                    <div className="input-group">
                        <div className="input-box">
                            <label htmlFor="price">Price (₹)</label>
                            <input type="number" id="price" name="price" placeholder="250" required onChange={handleInput} value={prod.price}/>
                        </div>
                        
                        <div className="input-box">
                            <label htmlFor="image_path">Image URL</label>
                            <input type="text" id="image_path" name="image_path" placeholder="Paste image link here" required  onChange={handleInput} value={prod.image_path}/>
                        </div>
                    </div>

                    <button type="submit" className="submit-product-btn">Add to Menu</button>
                </form>
            </div>
        </div>
    );
}
