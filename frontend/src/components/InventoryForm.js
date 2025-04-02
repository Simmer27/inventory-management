import { useState, useEffect } from "react";  
import { useInventoryContext } from '../hooks/useInventoryContext';  
import { useAuthContext } from "../hooks/useAuthContext"; 
import { useParams } from "react-router-dom";  
import { API_BASE_URL } from "../config";

// Component to handle adding or editing an inventory item
const InventoryForm = () => {
    const { dispatch } = useInventoryContext(); 
    const { user } = useAuthContext();  
    const { id } = useParams();  

    // State variables for form inputs
    const [title, setTitle] = useState('');
    const [room, setRoom] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');

    // State variables for handling errors and empty fields
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    // Fetch inventory data for editing if there's an item ID
    useEffect(() => {
        const fetchItem = async () => {
            if (id) {
                // Fetch data for the item being edited
                const response = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}` 
                    }
                });

                const json = await response.json();

                if (response.ok) {
                    // Set the form fields with existing data
                    setTitle(json.title);
                    setRoom(json.room);
                    setType(json.type);
                    setQuantity(json.quantity);
                } else {
                    setError(json.error);
                }
            }
        };

        if (user && id) {
            fetchItem();
        }
    }, [id, user]);  

    // Function to handle form submission 
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        // Ensure the user is logged in before allowing item creation or update
        if (!user) {
            setError('You must be logged in');
            return;
        }

        // Prepare the item object to be sent to the server
        const item = { title, room, type, quantity };

        let response;
        let json;

        // Check if we're in edit mode 
        if (id) {
            // Update the item in the database
            response = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
                method: 'PATCH',  
                body: JSON.stringify(item), 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`  
                }
            });
            json = await response.json();
        } else {
            // Add a new item
            response = await fetch(`${API_BASE_URL}/api/inventory/`, {
                method: 'POST',  
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            json = await response.json();
        }

        // If the request fails, set error messages and highlight empty fields
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

        // If the request is successful, reset the form and update global state
        if (response.ok) {
            setTitle('');
            setRoom('');
            setType('');
            setQuantity('');
            setError(null);
            setEmptyFields([]);
            console.log(id ? 'Item updated' : 'New item added', json);

            // Dispatch action to update inventory context
            dispatch({ type: id ? 'UPDATE_ITEM' : 'CREATE_ITEM', payload: json });

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
        <form className="create" onSubmit={handleSubmit}>
            <h3>{id ? 'Edit Item' : 'Add a New Item'}</h3>  {/* Display form title based on whether editing or adding */}

            {/* Input field for item name */}
            <label>Item Name:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            {/* Select dropdown for room */}
            <label>Room:</label>
            <select
                onChange={(e) => setRoom(e.target.value)}
                value={room}
                className={emptyFields.includes('room') ? 'error' : ''}
            >
                <option value="">Select Room</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Infant">Infant</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Office">Office</option>
                <option value="Preschool 1">Preschool 1</option>
                <option value="Preschool 2">Preschool 2</option>
                <option value="Toddler 1">Toddler 1</option>
                <option value="Toddler 2">Toddler 2</option>
                <option value="Washroom">Washroom</option>
            </select>

            {/* Input field for item type */}
            <label>Item Type:</label>
            <input
                type="text"
                onChange={(e) => setType(e.target.value)}
                value={type}
                className={emptyFields.includes('type') ? 'error' : ''}
            />

            {/* Input field for quantity */}
            <label>Quantity:</label>
            <input
                type="number"
                onChange={handleQuantityChange}
                value={quantity}
                className={emptyFields.includes('quantity') ? 'error' : ''}
            />

            {/* Submit button */}
            <button>{id ? 'Update Item' : 'Add Item'}</button>

            {/* Display error message if any */}
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default InventoryForm;
