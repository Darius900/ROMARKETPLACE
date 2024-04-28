const express = require('express');
const sequelize = require('./database/connection');
const session = require('express-session');
const passport = require('passport');
require('./passportConfig'); 
const userRoutes = require('./routes/userRoutes'); 
const shopRoutes = require('./routes/shopRoutes');
const productRoutes = require('./routes/productRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const LocalStrategy = require('passport-local').Strategy;  
const bcrypt = require('bcryptjs');  
const User = require('./models/user');  
const cookieParser = require('cookie-parser');
const cors = require('cors');  

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',  //origin of frontend
    credentials: true,  
};


const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

// Session configuration
app.use(session({
    secret: 'your_session_secret',  
    resave: false,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy 
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, { id: user.user_id, role: user.role });
        } catch (err) {
            return done(err);
        }
    }
));

app.use(express.static('public'));


// Routes
app.use('/api', userRoutes); 
app.use('/api/shops', shopRoutes);
app.use('/api/shops/:shop_id/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/orders', orderRoutes);



// test route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});


// database Connection
sequelize.authenticate()
    .then(() => console.log('Database connected.'))
    .catch(err => console.error('Error connecting to the database:', err));

// start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
