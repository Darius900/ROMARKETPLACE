import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './ShopsList.css';


function ShopsList() {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        async function fetchShops() {
            const response = await fetch('http://localhost:5000/api/shops');
            const data = await response.json();
            setShops(data);
        }
        fetchShops();
    }, []);

    return (
        <div>
        <h1 className='shopstitle'>Shops</h1>
        <div className="shops-container">
            
            {shops.map(shop => (
                <div key={shop.shop_id} className="shop-card">
                    <Link to={`/shop/${shop.shop_id}`} className="shop-title">{shop.name}</Link>
                    <p className="shop-description">{shop.description}</p>
                    <Link to={`/shop/${shop.shop_id}`} className="view-shop-link">View Shop</Link>
                </div>
            ))}
        </div>
        </div>
    );
}

export default ShopsList;
