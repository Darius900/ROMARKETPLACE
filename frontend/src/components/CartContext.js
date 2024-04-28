// src/components/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity) => {
        setCartItems(prevItems => {
            // Check if the product already exists in the cart
            const exists = prevItems.find(item => item.product_id === product.product_id);
            if (exists) {
                // Increase the quantity
                return prevItems.map(item =>
                    item.product_id === product.product_id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                // Add new item with quantity
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (product_id) => {
        setCartItems(prevItems => prevItems.filter(item => item.product_id !== product_id));
    };

    const updateQuantity = (product_id, quantity) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.product_id === product_id) {
                return { ...item, quantity };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
