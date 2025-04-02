import { useState } from "react";  
import { useSignup } from "../hooks/useSignup";  

// Signup component definition
const Signup = () => {
  // Local state to store the email and password inputs
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  

  // Destructure signup function, error message, and loading state from useSignup hook
  const { signup, error, isLoading } = useSignup();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  

    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)}  
        value={email}  
      />

      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)}  
        value={password}  
      />

      <button disabled={isLoading}>Sign up</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Signup;
