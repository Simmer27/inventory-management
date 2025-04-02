import { useState } from "react";  
import { useLogin } from "../hooks/useLogin";  

// Login component definition
const Login = () => {
  // Local state to store the email and password inputs
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  // Destructure login function, error message, and loading state from useLogin hook
  const { login, error, isLoading } = useLogin();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  

    // Call login function with email and password
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      {/* Input field for email */}
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)}  
        value={email}  
      />

      {/* Input field for password */}
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)}  
        value={password}  
      />

      {/* Submit button, disabled while loading */}
      <button disabled={isLoading}>Log in</button>

      {/* Display error message if there is any */}
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Login;
