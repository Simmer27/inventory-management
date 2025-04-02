import { createContext, useReducer } from "react";

export const InventoryContext = createContext();

// Reducer function to handle inventory state updates based on dispatched actions
export const inventoryReducer = (state, action) => {
    switch (action.type) {
        // Set initial inventory items in state
        case 'SET_ITEMS':
            return {
                items: action.payload 
            };

        // Add a new item to the inventory list
        case 'CREATE_ITEM':
            return {
                items: [action.payload, ...state.items] 
            };

        // Remove an item from the inventory list
        case 'DELETE_ITEM':
            return {
                items: state.items.filter((w) => w._id !== action.payload._id) 
            };

        case 'UPDATE_ITEM':  
            return {
                items: state.items.map(item =>
                    item._id === action.payload._id ? action.payload : item
                ),
            };

        // Return the current state if action type is unknown
        default:
            return state;
    }
};

// InventoryContextProvider component to wrap the application and provide inventory state
export const InventoryContextProvider = ({ children }) => {
    // useReducer hook to manage inventory state using inventoryReducer
    const [state, dispatch] = useReducer(inventoryReducer, {
        items: null 
    });

    return (
        // Provide inventory state and dispatch function to the entire app
        <InventoryContext.Provider value={{ ...state, dispatch }}>
            {children}
        </InventoryContext.Provider>
    );
};
