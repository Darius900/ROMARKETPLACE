const express = require('express');
const router = express.Router();
const Shop = require('../models/shop'); 
const multer = require('multer');

const path = require('path'); 

// configure storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // use Date.now() to make each filename unique
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });



// create a new shop
router.post('/', async (req, res) => {
    console.log("Create shop request received:", req.body);
    const { user_id, name, description } = req.body;
    try {
        const newShop = await Shop.create({ user_id, name, description });
        res.status(201).json(newShop);
    } catch (error) {
        console.error('Error creating shop:', error);
        res.status(500).json({ message: 'Error creating shop', error: error.message });
        }
});

// edit a shop
router.put('/:shop_id', async (req, res) => {
    const { name, description } = req.body;
    try {
        await Shop.update({ name, description }, { where: { shop_id: req.params.shop_id } });
        res.status(200).json({ message: 'Shop updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating shop', error });
    }
});

// get a specific shop
router.get('/:shop_id', async (req, res) => {
    try {
        const shop = await Shop.findByPk(req.params.shop_id);
        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving shop', error });
    }
});

// list all shops
router.get('/', async (req, res) => {
    try {
        const shops = await Shop.findAll();
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving shops', error });
    }
});

// get shop by user ID
router.get('/user/:user_id', async (req, res) => {
    try {
        const shop = await Shop.findOne({ where: { user_id: req.params.user_id } });
        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving shop', error });
    }
});

// route to upload a banner image for a shop
router.post('/:shop_id/uploadBanner', upload.single('banner'), async (req, res) => {
    const { shop_id } = req.params;
    const bannerFile = req.file;

    try {
        // update the shop's banner field with the filename of the uploaded image
        await Shop.update({ banner: bannerFile.filename }, { where: { shop_id: shop_id } });
        res.status(200).json({ bannerFilename: bannerFile.filename });
    } catch (error) {
        console.error('Error uploading banner:', error);
        res.status(500).json({ message: 'Error uploading banner', error: error.message });
    }
});

router.put('/:shop_id/customize', async (req, res) => {
    const { shop_id } = req.params;
    const { description, bannerFilename } = req.body; 

    try {
        await Shop.update({ description, banner: bannerFilename }, { where: { shop_id } });
        res.status(200).json({ message: 'Shop customized successfully' });
    } catch (error) {
        console.error('Error customizing shop:', error);
        res.status(500).json({ message: 'Error customizing shop', error: error.message });
    }
});



module.exports = router;
