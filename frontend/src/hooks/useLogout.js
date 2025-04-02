import { useAuthContext } from './useAuthContext';

// Custom hook to handle user logout functionality
export const useLogout = () => {
    
    const { dispatch } = useAuthContext();

    // Function to log the user out
    const logout = () => {
        // Remove user data from local storage to clear authentication session
        localStorage.removeItem('user');

        // Dispatch logout action to update authentication context
        dispatch({ type: 'LOGOUT' });
    };

    return { logout };
};
