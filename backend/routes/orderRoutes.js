const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');
const Shop = require('../models/shop');
const User = require('../models/user');

// middleware to check if user is logged in
function isAuthenticated(req, res, next) {
    // log the incoming request headers and cookies
    console.log("Request Headers:", req.headers);
    console.log("Cookies:", req.cookies); 

    if (req.isAuthenticated()) {
        // log the session information if authenticated
        console.log("Session:", req.session);
        console.log("User:", req.user);
        return next();
    }

    // if not authenticated, log this information
    console.log("User not authenticated");
    res.status(401).json({ message: 'You must be logged in to perform this action' });
}


// create new order
router.post('/', isAuthenticated, async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    try {
        const newOrder = await Order.create({
            user_id,
            product_id,
            quantity,
            order_status: 'pending',
            order_date: new Date()
        });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
});

// update order status
router.put('/:order_id', isAuthenticated, async (req, res) => {
    const { order_status } = req.body;

    try {
        const updatedOrder = await Order.update(
            { order_status },
            { where: { order_id: req.params.order_id } }
        );
        if (updatedOrder[0] === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
});

// get all orders for a user
router.get('/user/:user_id', isAuthenticated, async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { user_id: req.params.user_id }
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ message: 'Error retrieving orders', error: error.message });
    }
});

// get a specific order
router.get('/:order_id', isAuthenticated, async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.order_id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ message: 'Error retrieving order', error: error.message });
    }
});

module.exports = router;
