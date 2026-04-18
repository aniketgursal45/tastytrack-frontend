import React, { useEffect, useState } from 'react';
import './AdminOrder.css';

export default function AdminOrder() {
    const [orders, setOrders] = useState([]);

  
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:8080/admin/getOrder");
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

   
    const handleUpdateStatus = async (orderId) => {
        const selectElement = document.getElementById(`status-${orderId}`);
        const newStatus = selectElement.value;

        try {
            const response = await fetch(`http://localhost:8080/admin/updateStatus/${orderId}/${newStatus}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            
            const isSuccess = await response.json();

            if (isSuccess === true) {
                alert(`Success! Order #${orderId} status changed to ${newStatus}`);
                
                
                setOrders(prevOrders => 
                    prevOrders.map(order => 
                        order.order_id === orderId 
                        ? { ...order, order_status: newStatus } 
                        : order
                    )
                );
            } else {
                alert("Update failed at the database level. Please try again.");
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Connection error. Is the backend running?");
        }
    };

    return (
        <div className="admin-orders-wrapper">
            <header className="admin-header">
                <div className="header-content">
                    <h1>Admin <span>Management</span></h1>
                    <div className="admin-badge">Backend Connected</div>
                </div>
            </header>

            <main className="admin-main">
                <div className="orders-table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Info</th>
                                <th>Delivery Details</th>
                                <th>Total Price</th>
                                <th>Current Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.order_id}>
                                    <td className="order-id-cell">#TT-{order.order_id}</td>
                                    <td>
                                        <div className="cust-info">
                                            <p className="cust-name">{order.username}</p>
                                            <p className="cust-phone">{order.number}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="order-loc">{order.city}, {order.pincode}</p>
                                        <p className="order-date">
                                            {new Date(order.order_date).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="order-price">₹{order.total_amount.toFixed(2)}</td>
                                    <td>
                                        <span className={`status-badge ${order.order_status.toLowerCase().replace(/ /g, "_")}`}>
                                            {order.order_status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="admin-action-row">
                                            <select 
                                                className="status-dropdown" 
                                                id={`status-${order.order_id}`}
                                                defaultValue={order.order_status}
                                            >
                                                <option value="PENDING">Pending</option>
                                                <option value="CONFIRMED">Confirmed</option>
                                                <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                                                <option value="DELIVERED">Delivered</option>
                                                <option value="CANCELLED">Cancelled</option>
                                            </select>
                                            <button 
                                                className="update-action-btn"
                                                onClick={() => handleUpdateStatus(order.order_id)}
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}