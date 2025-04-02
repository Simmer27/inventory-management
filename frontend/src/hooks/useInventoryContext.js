import { InventoryContext } from "../context/InventoryContext";
import { useContext } from "react";

// Custom hook to access inventory context
export const useInventoryContext = () => {
    // Retrieve the InventoryContext value using useContext hook
    const context = useContext(InventoryContext);

    // Ensure the hook is used within an InventoryContextProvider
    if (!context) {
        throw Error('useInventoryContext must be used inside an InventoryContextProvider'); 
    }

    // Return the inventory context to the caller
    return context;
};
