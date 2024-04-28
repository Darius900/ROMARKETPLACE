const express = require('express');
const router = express.Router({ mergeParams: true });
const Product = require('../models/product');

// middleware to extract shop_id from the route parameters
function getShopId(req, res, next) {
    const { shop_id } = req.params;
    if (!shop_id) {
        return res.status(400).json({ message: 'Shop ID is required' });
    }
    req.shop_id = parseInt(shop_id);
    next();
}

// add a new product to a shop
router.post('/', getShopId, async (req, res) => {
    const { name, description, price, category_id } = req.body;
    const shop_id = req.shop_id;
    try {
        const newProduct = await Product.create({
            name, 
            description, 
            price, 
            category_id,
            shop_id
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
});

// fetch all products with optional category filtering
router.get('/all', async (req, res) => {
    const { category_id } = req.query;
    try {
        const whereClause = category_id ? { category_id } : {};
        const products = await Product.findAll({ where: whereClause });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
});


// Fetch products by shop_id
router.get('/', getShopId, async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { shop_id: req.shop_id }
        });
        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
});

// Edit a product
router.put('/:product_id', async (req, res) => {
    const { name, description, price, category_id } = req.body;
    try {
        const result = await Product.update(
            { name, description, price, category_id }, // Include category_id in product update
            { where: { product_id: req.params.product_id } }
        );
        if (result[0] === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

// Delete a product
router.delete('/:product_id', async (req, res) => {
    try {
        const result = await Product.destroy({ where: { product_id: req.params.product_id } });
        if (result === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

module.exports = router;
