import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App'; 
import { InventoryContextProvider } from './context/InventoryContext'; 
import { AuthContextProvider } from './context/AuthContext'; 

// Create the root element for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application within the strict mode, with context providers
root.render(
  <React.StrictMode>  {/* StrictMode helps to highlight potential issues in development */}
    <AuthContextProvider>  {/* Wrap the app with the AuthContextProvider to manage user authentication */}
      <InventoryContextProvider>  {/* Wrap the app with the InventoryContextProvider to manage inventory data */}
        <App />  {/* The main app component */}
      </InventoryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

