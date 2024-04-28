// src/components/Header.js

import React, { useContext } from 'react'; 
import './Header.css';
import { UserContext } from '../UserContext';  

const Header = () => {
    const { user, setUser } = useContext(UserContext);  

    // Logout function
    const handleLogout = () => {
        setUser(null);  // Reset user state
        
        localStorage.removeItem('user'); // Clear user data from local storage
    };

    return (
        <header className="header">
            <div className="header-left">
                <a href="/contact">Contact</a>
            </div>
            <h1>Romanian Marketplace</h1>
            <div className="header-right">
                {user ? (
                    // If user is logged in
                    <>
                        <span>Hello, {user.username}!</span>  
                        {user.role === 'seller' && <a href="/seller/dashboard">Seller Dashboard</a>}
                        <a href="/" onClick={handleLogout}>Logout</a>  
                    </>
                ) : (
                    // If user is not logged in
                    <>
                        <a href="/register">Înregistrare</a>
                        <a href="/login">Loghează-te</a>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
