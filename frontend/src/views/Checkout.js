import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';


function Checkout() {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    const handleCheckout = async () => {
        setIsProcessing(true);

       
        const user = JSON.parse(localStorage.getItem('user'));

        // Map cart items to order format
        const orders = cartItems.map(item => ({
            user_id: user.user_id,
            product_id: item.product_id,
            quantity: item.quantity
        }));

        try {
            // Create orders for each item in the cart
            for (const order of orders) {
                await fetch('http://localhost:5000/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(order),
                    credentials: 'include' 
                    
                });
            }
            clearCart();
            navigate('/order-success');  
        } catch (error) {
            console.error('Checkout failed:', error);
            // Handle checkout failure
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <div className="cart-summary">
                {cartItems.map(item => (
                    <div key={item.product_id} className="cart-item">
                        {item.name} - Quantity: {item.quantity} - Price: ${item.price}
                    </div>
                ))}
                <div className="total-price">
                    Total Price: ${getTotalPrice().toFixed(2)}
                </div>
            </div>
            <button onClick={handleCheckout} disabled={isProcessing || cartItems.length === 0}>
                {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
        </div>
    );
}

export default Checkout;
