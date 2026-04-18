import "./ManageProducts.css"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ManageProducts() {

    let nav = useNavigate();

    let [mProduct, setProduct] = useState([]);

    const url = "http://localhost:8080/admin/sList"

    function delProduct(num) {

        let n = Number(num);

        fetch(`http://localhost:8080/admin/delproduct/${n}`,{
            method:"DELETE"
        }).then((res) => res.json()).then((data) => {
            if (data === true) {
                fetch(url)
                .then(res => res.json())
                .then(data => setProduct(data));
            }
        })

    }

    useEffect(() => {
        fetch(url).then((res) => res.json()).then((data) => {
            return setProduct(data);
        })
    }, [])

    return (
        <div className="manage-products-container">
            <div className="manage-header">
                <div className="header-left">
                    <h2>Product Inventory</h2>
                    <p>Showing {mProduct.length} items in the menu</p>
                </div>
                <button className="btn-go-home" onClick={() => nav("/AHome")}>
                    Go to Dashboard
                </button>
            </div>

            <div className="products-table-wrapper">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Details</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mProduct.map((item) => (
                                <tr key={item.product_id} className="product-row">
                                    <td className="img-cell">
                                        <img src={item.image_path} alt={item.name} className="admin-product-img" />
                                    </td>
                                    <td className="details-cell">
                                        <div className="p-name">{item.name}</div>
                                        <div className="p-desc">{item.description}</div>
                                    </td>
                                    <td>
                                        <span className={`cat-badge ${item.category?.toLowerCase().replace(" ", "-")}`}>
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="p-price">₹{item.price}</td>
                                    <td className="actions-cell">
                                        <button className="btn-update" onClick={() => nav(`/UProducts/${item.product_id}`)}>Update</button>
                                        <button className="btn-delete" onClick={() => { delProduct(item.product_id) }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}