import { useInventoryContext } from "../hooks/useInventoryContext";  
import { useAuthContext } from "../hooks/useAuthContext";  
import { useNavigate } from "react-router-dom"; 
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";  
import { useState } from "react"; 
import { API_BASE_URL } from "../config";

const InventoryDetails = ({ item }) => {
    const { dispatch } = useInventoryContext();  
    const { user } = useAuthContext();  
    const navigate = useNavigate();  
    const [requested, setRequested] = useState(false);  

    // Function to handle the delete action
    const handleClick = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");  
        if (!user) return;  // Ensure the user is logged in
        if (!confirmDelete) {
            return;  
        }
        // Make a DELETE request to the API to remove the item
        const response = await fetch(`${API_BASE_URL}/api/inventory/` + item._id, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }  
        });

        // If the deletion is successful, dispatch the delete action to the inventory context
        if (response.ok) {
            const json = await response.json();
            dispatch({ type: 'DELETE_ITEM', payload: json });
        }
    };

    // Function to handle the edit action
    const handleEditClick = () => {
        navigate(`/edit/${item._id}`);  
    };

    // Function to handle the request action
    const handleRequest = async () => {
        if (!user) return; 

        // Make a POST request to the API to create a request for this item
        const response = await fetch(`${API_BASE_URL}/api/requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`  
            },
            body: JSON.stringify({ 
                itemId: item._id,  
                title: item.title, 
                room: item.room,
                quantity: item.quantity 
            })
        });

        console.log("API Response:", response);  

        // If the request is successful, set the 'requested' state to true
        if (response.ok) {
            setRequested(true);
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData);  
        }
    };

    return (
        <div className="inventory-details">
            <h4>{item.title}</h4>  {/* Display the item title */}
            <p><strong>Room: </strong>{item.room}</p>  {/* Display the room */}
            <p><strong>Type: </strong>{item.type}</p>  {/* Display the item type */}
            <p><strong>Quantity: </strong>{item.quantity}</p>  {/* Display the quantity */}
            <p>{formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}</p>  {/* Display how long ago the item was created */}

            <div className="inventory-buttons">
                <button className="edit-btn" onClick={handleEditClick}>Edit</button>  {/* Edit button */}
                <span className="delete-icon material-symbols-outlined" onClick={handleClick}>delete</span>  {/* Delete icon button */}

                <button 
                    className={`request-btn ${requested ? 'requested' : ''}`}  
                    onClick={handleRequest}  
                    disabled={requested}  
                >
                    {requested ? "Requested" : "Request"}  {/* Change button text based on request status */}
                </button>
            </div>
        </div>
    );
};

export default InventoryDetails;


