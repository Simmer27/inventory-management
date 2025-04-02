import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { API_BASE_URL } from "../config";

// Custom hook to handle user signup functionality
export const useSignup = () => {
  // State for tracking signup errors
  const [error, setError] = useState(null);

  // State for tracking loading status during signup
  const [isLoading, setIsLoading] = useState(null);

  // Extract dispatch function from authentication context to update auth state
  const { dispatch } = useAuthContext();

  // Async function to handle user signup
  const signup = async (email, password) => {
    setIsLoading(true); 
    setError(null); 

    // Send signup request to backend API
    const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }) 
    });

    const json = await response.json();

    // Handle signup failure
    if (!response.ok) {
      setIsLoading(false); 
      setError(json.error); 
    }

    // Handle successful signup
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));

      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
