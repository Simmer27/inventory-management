import { useState, useEffect } from "react";
import { useInventoryContext } from "../hooks/useInventoryContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const EditInventory = () => {
    const { dispatch } = useInventoryContext();
    const { user } = useAuthContext();
    const { id } = useParams();  
    const navigate = useNavigate();

    // State for the item details
    const [title, setTitle] = useState('');
    const [room, setRoom] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState(null);

    // Fetch the item details when the component mounts
    useEffect(() => {
        const fetchItemDetails = async () => {
            if (!user) {
                setError('You must be logged in');
                return;
            }

            // Fetch the item data from the API based on the id
            const response = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();

            if (response.ok) {
                // Set the form fields with the current item data
                setTitle(json.title);
                setRoom(json.room);
                setType(json.type);
                setQuantity(json.quantity);
            } else {
                setError(json.error);
            }
        };

        fetchItemDetails();
    }, [id, user]);

    // Handle form submission to update the item
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update the item details via a PUT request
        const updatedItem = { title, room, type, quantity };

        const response = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
            method: 'PATCH', // Update request
            body: JSON.stringify(updatedItem),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            // Dispatch action to update inventory context
            dispatch({ type: 'UPDATE_ITEM', payload: json });
            // Redirect to the homepage after successful update
            navigate('/');
        } else {
            setError(json.error);
        }
    };

    // Handle quantity input to ensure it's not negative
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        // Only update if the value is non-negative
        if (value >= 0) {
            setQuantity(value);
        }
    };
    

    return (
        <div className="edit">
            <h3>Edit Item</h3>
            
            {/* Display error message if any */}
            {error && <div className="error">{error}</div>}

            {/* Form to edit item details */}
            <form onSubmit={handleSubmit}>
                <label>Item Name:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Room:</label>
                <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />

                <label>Type:</label>
                <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />

                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                />

                <button type="submit">Update Item</button>
            </form>
        </div>
    );
};

export default EditInventory;
