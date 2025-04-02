import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';  
import { useAuthContext } from './hooks/useAuthContext';  

import Home from './pages/Home';  
import Login from './pages/Login';  
import Signup from './pages/Signup';  
import Navbar from './components/Navbar';  
import Cleaning from './pages/Cleaning';  
import Infant from './pages/Infant';  
import Kitchen from './pages/Kitchen';  
import Office from './pages/Office';  
import Preschool1 from './pages/Preschool1';  
import Preschool2 from './pages/Preschool2';  
import Toddler1 from './pages/Toddler1';  
import Toddler2 from './pages/Toddler2';  
import Washroom from './pages/Washroom';  
import EditInventory from './pages/EditInventory';  
import Requests from './pages/Requests';  

// Main App component definition
function App() {
  const { user } = useAuthContext();  

  return (
    <div className="App">
      <BrowserRouter>  
        <Navbar />  
        
        <div className="pages">
          {/* Define routes for the application */}
          <Routes>
            {/* Home page route, accessible only if the user is logged in */}
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />}  // If user is logged in, show Home; otherwise, redirect to login page
            />

            <Route 
              path="/requests" 
              element={user ? <Requests /> : <Navigate to="/login" />}  // Requests page
            />

            <Route 
              path="/rooms/cleaning" 
              element={user ? <Cleaning /> : <Navigate to="/login" />}  // Cleaning room page
            />

            <Route 
              path="/rooms/infant" 
              element={user ? <Infant /> : <Navigate to="/login" />}  // Infant room page
            />

            <Route 
              path="/rooms/kitchen" 
              element={user ? <Kitchen /> : <Navigate to="/login" />}  // Kitchen room page
            />

            <Route 
              path="/rooms/office" 
              element={user ? <Office /> : <Navigate to="/login" />}  // Office room page
            />

            <Route 
              path="/rooms/preschool1" 
              element={user ? <Preschool1 /> : <Navigate to="/login" />}  // Preschool 1 room page
            />

            <Route 
              path="/rooms/preschool2" 
              element={user ? <Preschool2 /> : <Navigate to="/login" />}  // Preschool 2 room page
            />

            <Route 
              path="/rooms/toddler1" 
              element={user ? <Toddler1 /> : <Navigate to="/login" />}  // Toddler 1 room page
            />

            <Route 
              path="/rooms/toddler2" 
              element={user ? <Toddler2 /> : <Navigate to="/login" />}  // Toddler 2 room page
            />

            <Route 
              path="/rooms/washroom" 
              element={user ? <Washroom /> : <Navigate to="/login" />}  // Washroom page
            />

            <Route path="/edit/:id" element={<EditInventory />} // Edit inventory page, requires an item ID
            />  

            {/* Login page route, accessible only if the user is not logged in */}
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />}  
            />

            {/* Signup page route, accessible only if the user is not logged in */}
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />}  
            />
          </Routes>
        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
