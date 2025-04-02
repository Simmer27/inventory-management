import { useEffect } from 'react';  
import { useInventoryContext } from '../hooks/useInventoryContext';  
import { useAuthContext } from '../hooks/useAuthContext';  
import { API_BASE_URL } from "../config";

import InventoryDeatils from '../components/InventoryDetails';  
import InventoryForm from '../components/InventoryForm';  

const Cleaning = () => {

    const { items, dispatch } = useInventoryContext();
    const { user } = useAuthContext();

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

    // Filter items to only show those with a specific room type
    const filteredItems = items 
        ? items
            .filter(item => item.room === 'Cleaning') 
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        : [];

    return (
        <div className="cleaning">
            {/* Display the list of filtered inventory items */}
            <div className='items'>
                <h1>Cleaning</h1>
                {filteredItems && filteredItems.map((item) => (
                    <InventoryDeatils key={item._id} item={item} /> 
                ))}
            </div>

            {/* Render the InventoryForm to add new items */}
            <InventoryForm />
        </div>
    );
};

export default Cleaning;