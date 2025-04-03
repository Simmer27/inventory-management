import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { API_BASE_URL } from "../config";

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchRequests = async () => {
            if (!user) return;

            const response = await fetch(`${API_BASE_URL}/api/requests`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });

            if (response.ok) {
                const json = await response.json();
                console.log("Fetched requests:", json); 
                setRequests(json);
            } else {
                console.log("Error:", response.status);  
            }
        };

        fetchRequests();
    }, [user]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this request?");
        if (confirmDelete) {
            const response = await fetch(`${API_BASE_URL}/api/requests/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            });

            if (response.ok) {
                // Remove the deleted request from the local state
                setRequests(requests.filter(request => request._id !== id));
            } else {
                console.error('Failed to delete request');
            }
        }
    };

    return (
        <div>
            <h2>Requested Items</h2>
            {requests.length > 0 ? (
                <ul>
                    {requests.map((request) => (
                        <li key={request._id}>
                            <strong>{request.title}</strong> ({request.room}) - Quantity: {request.quantity}
                            <button className="delete-request-btn" onClick={() => handleDelete(request._id)}>Delete</button>  {/* Delete button */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No requested items.</p>
            )}
        </div>
    );
};

export default Requests;
