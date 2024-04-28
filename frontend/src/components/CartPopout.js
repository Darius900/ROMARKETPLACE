
import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const CartPopout = ({ onClose }) => {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate(); // 
    
    const handleCheckout = () => {
        navigate('/checkout'); 
    };

    return (
        <div className="cart-popout">
            <button className="close-cart" onClick={onClose}>X</button>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.product_id}>
                        {item.name} - Quantity: {item.quantity}
                        <button onClick={() => removeFromCart(item.product_id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleCheckout}>Go to Checkout</button>
                    </div>
    );
};

export default CartPopout;
