import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import './ShopView.css';

function ShopView() {
    const [shop, setShop] = useState(null);
    const [products, setProducts] = useState([]);
    const { shopId } = useParams();
    const { addToCart } = useCart(); 

    useEffect(() => {
        async function fetchShopAndProducts() {
            // Fetch shop details
            const shopResponse = await fetch(`http://localhost:5000/api/shops/${shopId}`);
            const shopData = await shopResponse.json();
            setShop(shopData);

            // Fetch products for this shop
            const productsResponse = await fetch(`http://localhost:5000/api/shops/${shopId}/products`);
            const productsData = await productsResponse.json();
            setProducts(productsData);
        }
        fetchShopAndProducts();
    }, [shopId]);

    if (!shop) return <div>Loading...</div>;


    
    return (
        <div className="sv-container">
            <div className="sv-shop-details">
                <h1 className="sv-shop-name">{shop.name}</h1>
                <img src={`/uploads/${shop.banner}`} alt="Shop Banner" className="sv-shop-banner" />
                <p className="sv-shop-description">{shop.description}</p>
            </div>
            <div className="sv-products-container">
                {products.map(product => (
                    <div key={product.product_id} className="sv-product-card">
                        <h3 className="sv-product-name">{product.name}</h3>
                        <p className="sv-product-description">{product.description}</p>
                        <div className="sv-product-add-to-cart">
                            <select defaultValue={1} id={`quantity_${product.product_id}`} className="sv-quantity-select">
                                {[...Array(10).keys()].map(n => (
                                    <option key={n + 1} value={n + 1}>{n + 1}</option>
                                ))}
                            </select>
                            <button className="sv-add-to-cart-btn" onClick={() => {
                                const quantity = parseInt(document.getElementById(`quantity_${product.product_id}`).value);
                                if (!isNaN(quantity) && quantity > 0) {
                                    addToCart(product, quantity);
                                } else {
                                    console.error('Invalid quantity:', quantity);
                                }
                            }}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShopView;
