import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext'; 
import './ProductDisplay.css';

const ProductDisplay = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const { addToCart } = useCart();

    // Fetch Products
    useEffect(() => {
        fetch('http://localhost:5000/api/products/all')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products', error));

            
    }, []);

    // Fetch Categories
    useEffect(() => {
        fetch('http://localhost:5000/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories', error));
    }, []);

    // Fetch Products by Category
    const fetchProductsByCategory = (categoryId) => {
        fetch(`http://localhost:5000/api/products/all?category_id=${categoryId}`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products', error));
    };

    // Handle Category Change
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        if (event.target.value) {
            fetchProductsByCategory(event.target.value);
        } else {
            fetch('http://localhost:5000/api/products/all')
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error fetching products', error));
        }
    };

    return (
        <div>
            <h1>Products</h1>
            <div className="category-selector">
                <label htmlFor="category-select">Choose a category:</label>
                <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                    <option key={category.category_id} value={category.category_id}>
                        {category.name}
                    </option>
                    ))}
                </select>
                </div>

            <div className="products-container">
            {products.map(product => (
             <div key={product.product_id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
                <select defaultValue={1} id={`quantity_${product.product_id}`}>
            {[...Array(10).keys()].map(n => (
                <option key={n + 1} value={n + 1}>{n + 1}</option>
            ))}
        </select>
        <button onClick={() => {
    const quantity = parseInt(document.getElementById(`quantity_${product.product_id}`).value);
    console.log(`Adding ${quantity} of product ${product.product_id} to cart`); 
    if (!isNaN(quantity) && quantity > 0) {
        addToCart(product, quantity);
    } else {
        console.error('Invalid quantity:', quantity);
    }
}}>
    Add to Cart
</button>
      
    </div>
))}
            </div>
        </div>
    );
};

export default ProductDisplay;
