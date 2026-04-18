import { useEffect, useState } from "react"
import "./DUsers.css"

export default function DUsers() {

    let [users, setUsers] = useState([]);

    const url = "http://localhost:8080/admin/uList"

    useEffect(() => {
        fetch(url).then((res) => res.json()).then((data) => setUsers(data))
    }, [])

    
    function deluser(num) {

        let n = Number(num);

        fetch(`http://localhost:8080/admin/deluser/${n}`,{
            method:"DELETE"
        }).then((res) => res.json()).then((data) => {
            if (data === true) {
                fetch(url)
                .then(res => res.json())
                .then(data => setUsers(data));
            }
        })

    }

    return (
        <div className="users-list-container">
            <div className="users-header">
                <h2>User Management</h2>
                <p>Manage and monitor all registered TastyTrack customers</p>
            </div>

            <div className="users-table-wrapper">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email Address</th>
                            <th>Security Info</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((u) => (
                                <tr key={u.userId} className="user-row">
                                    <td className="user-id">#{u.userId}</td>
                                    <td className="user-name-cell">
                                        <strong>{u.username}</strong>
                                    </td>
                                    <td className="user-email">{u.email}</td>
                                    <td className="user-security">
                                        <div className="q-badge">Q: {u.securityQuestion}</div>
                                        <div className="a-text">A: {u.securityAnswer}</div>
                                    </td>
                                    <td className="user-actions">
                                        <button className="btn-delete-user"onClick={() => { deluser(u.userId)}} >Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}