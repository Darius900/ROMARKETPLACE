import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import LandingPage from './views/LandingPage';
import Categories from './views/Categories';
import Login from './views/Login';
import Register from './views/Register';
import ProtectedRoute from './components/ProtectedRoute'; 
import SellerDashboard from './views/SellerDashboard';
import { UserContext } from './UserContext';
import ProductDisplay from './views/ProductDisplay';
import { CartProvider } from './components/CartContext'; 
import CartPopout from './components/CartPopout';
import SellerShop from './views/SellerShop';
import ShopView from './views/ShopView';
import ShopsList from './views/ShopsList';
import Checkout from './views/Checkout';
import OrderSuccess from './views/OrderSuccess';


const basename = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/` : '/';

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
            <CartProvider>
                <Header />
                <Navbar />
                <div className="content-wrapper"> 
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/products" element={<ProductDisplay />} />
                        <Route path="/cartpopout" element={<CartPopout />} />
                        <Route path="/sellershop" element={<SellerShop />} />
                        <Route path="/shop/:shopId" element={<ShopView />} />
                        <Route path="/shops" element={<ShopsList />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-success" element={<OrderSuccess />} />


                       
                        <Route path="/seller/dashboard" element={
                            <ProtectedRoute role="seller">
                                <SellerDashboard />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
                <Footer />  
                </CartProvider>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
