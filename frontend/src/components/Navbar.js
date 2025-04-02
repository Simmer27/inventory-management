import React from 'react';
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

// NavBar component for navigation and authentication controls
const NavBar = () => {
    // Get the logout function from the useLogout hook
    const { logout } = useLogout()

    // Get user details from authentication context
    const { user } = useAuthContext()

    // Function to handle user logout
    const handleClick = () => {
        logout()
    }

    // State to handle dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    return (
        <header>
            <div className="container">
                <div className="nav">
                {/* Logo and home link */}
                <Link to="/">
                    <h2>Dashboard</h2>
                </Link>
                </div>
                <nav>
                    {/* Dropdown menu for rooms */}
                    {user && (
                            <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                                <Link to="#" className="dropdown-link"><h2>Rooms</h2></Link>
                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        <Link to="/rooms/cleaning">Cleaning</Link>
                                        <Link to="/rooms/infant">Infant</Link>
                                        <Link to="/rooms/kitchen">Kitchen</Link>
                                        <Link to="/rooms/office">Office</Link>
                                        <Link to="/rooms/preschool1">Preschool 1</Link>
                                        <Link to="/rooms/preschool2">Preschool 2</Link>
                                        <Link to="/rooms/toddler1">Toddler 1</Link>
                                        <Link to="/rooms/toddler2">Toddler 2</Link>
                                        <Link to="/rooms/washroom">Washroom</Link>
                                    </div>
                                )}
                            </div>
                    )}

                    {/* Dropdown menu for rooms */}
                    {user && (
                        <Link to="/requests" className="nav-link">
                            <h2>Requests</h2>
                        </Link>         
                    )}
                
                    {/* If user is logged in, display their email and logout button */}
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}

                    {/* If no user is logged in, show login and signup links */}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            {/* signup functionality , currently commented out as I do not think i will implement this in the future*/}
                            {/* <Link to="/signup">Signup</Link> */}
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default NavBar
