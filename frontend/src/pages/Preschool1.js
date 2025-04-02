import { useEffect } from 'react';  
import { useInventoryContext } from '../hooks/useInventoryContext';  
import { useAuthContext } from '../hooks/useAuthContext'; 
import { API_BASE_URL } from "../config";

import InventoryDeatils from '../components/InventoryDetails';  
import InventoryForm from '../components/InventoryForm';  

// Preschool component that displays inventory items and the form to add new items
const Preschool1 = () => {

    const { items, dispatch } = useInventoryContext();
    const { user } = useAuthContext();

    // Fetch inventory items when the component mounts or when user changes
    useEffect(() => {
        const fectchInventory = async () => {

            const response = await fetch(`${API_BASE_URL}/api/inventory/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}` 
                }
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_ITEMS', payload: json });
            }
        };

        if (user) {
            fectchInventory();
        }
    }, [dispatch, user]);  

    const filteredItems = items 
        ? items
            .filter(item => item.room === 'Preschool 1') 
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        : [];

    return (
        <div className="preschool 1">
            {/* Display the list of filtered inventory items */}
            <div className='items'>
                <h1>Preschool 1</h1>
                {filteredItems && filteredItems.map((item) => (
                    <InventoryDeatils key={item._id} item={item} /> 
                ))}
            </div>

            {/* Render the InventoryForm to add new items */}
            <InventoryForm />
        </div>
    );
};

export default Preschool1;