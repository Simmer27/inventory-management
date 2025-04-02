import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { API_BASE_URL } from "../config";

// Custom hook to handle user login functionality
export const useLogin = () => {
  // State for tracking login errors
  const [error, setError] = useState(null);

  // State for tracking loading status during login
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  // Async function to handle user login
  const login = async (email, password) => {
    setIsLoading(true); 
    setError(null); 

    // Send login request to backend API
    const response = await fetch(`${API_BASE_URL}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }) 
    });

    // Parse JSON response
    const json = await response.json();

    // Handle login failure
    if (!response.ok) {
      setIsLoading(false); 
      setError(json.error); 
    }

    // Handle successful login
    if (response.ok) {
      // Save user data to local storage for persistent authentication
      localStorage.setItem('user', JSON.stringify(json));

      // Dispatch login action to update authentication context
      dispatch({ type: 'LOGIN', payload: json });

      // Stop loading state after successful login
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
