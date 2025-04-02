import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// Custom hook to access authentication context
export const useAuthContext = () => {
  // Retrieve the AuthContext value using useContext hook
  const context = useContext(AuthContext);

  // Ensure the hook is used within an AuthContextProvider
  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }

  // Return the authentication context to the caller
  return context;
};
