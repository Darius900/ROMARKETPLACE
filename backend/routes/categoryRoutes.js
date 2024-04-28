const express = require('express');
const router = express.Router();
const Product = require('../models/product'); 
const Category = require('../models/category'); 



// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error });
    }
});

// Get products by category
router.get('/:category_id/products', async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { category_id: req.params.category_id }
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
});

module.exports = router;
