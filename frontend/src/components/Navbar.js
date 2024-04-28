
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css';
import { useCart } from './CartContext';
import CartPopout from './CartPopout';

const Navbar = () => {
    const { cartItems } = useCart(); // Get cart items from the context
    const [showCart, setShowCart] = useState(false);

      //handle closing the cart popout
      const handleCloseCart = () => {
        setShowCart(false);
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item"><Link to="/">Acasa</Link></li>
                <li className="nav-item"><Link to="/categories">Categorii</Link></li>
                <li className="nav-item"><Link to="/placeholder">Nautati</Link></li>
                <li className="nav-item"><Link to="/shops">Magazine</Link></li>
                <li className="nav-item"><Link to="/products">Cumpara</Link></li>
                <li className="nav-item"><Link to="/sell">Vinde</Link></li>
                <li className="nav-item"><Link to="/placeholder">Despre noi</Link></li>
                <li className="nav-item"><Link to="/placeholder">FAQ</Link></li>
                <li className="nav-item">
                <div className="cart-item-count" onClick={() => setShowCart(!showCart)}>
                Cart: {cartItems.length} items
            </div>
            {showCart && <CartPopout onClose={handleCloseCart} />} 
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
