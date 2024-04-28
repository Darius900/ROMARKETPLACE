// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Shop = require('../models/shop');  





// register route with role selection
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!['buyer', 'seller', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ 
            username, 
            email, 
            password: hashedPassword, 
            role 
        });

         // after user creation
    if (role === 'seller') {
        try {
            await Shop.create({ user_id: newUser.user_id, name: `Shop of ${username}`, description: 'Default description' });
        } catch (shopError) {
            console.error('Error creating shop for seller:', shopError);
            
        }
    }

        
        res.status(201).json({ message: 'User registered', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// role checking middleware
function checkRole(requiredRole) {
    return (req, res, next) => {
        if (req.user && req.user.role === requiredRole) {
            next();
        } else {
            res.status(403).send('Access denied');
        }
    };
}


// Login route

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // additional step to fetch shop_id for sellers
        if (user.role === 'seller') {
            const shop = await Shop.findOne({ where: { user_id: user.user_id } });
            if (shop) {
                // include shop_id in the user object
                user.dataValues.shop_id = shop.shop_id;
            }
        }

        res.status(200).json({ message: 'Login successful', user: user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
});


module.exports = router;

// export the checkRole function separately
exports.checkRole = function(requiredRole) {
    return (req, res, next) => {
        if (req.user && req.user.role === requiredRole) {
            next();
        } else {
            res.status(403).send('Access denied');
        }
    };
};
