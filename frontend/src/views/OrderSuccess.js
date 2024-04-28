import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="order-success-container">
            <h1>Order Successful!</h1>
            <p>Your order has been placed successfully.</p>
            <p>Thank you for shopping with us.</p>

          
            <Link to="/">Return to Home</Link>
        </div>
    );
};

export default OrderSuccess;
