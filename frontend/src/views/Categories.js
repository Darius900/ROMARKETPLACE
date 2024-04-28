import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch categories from the backend
        fetch('http://localhost:5000/api/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className="categories-page">
            <div className="categories-grid">
                {categories.map((category) => (
                    <div key={category.category_id} className="category-card" onClick={() => navigate(`/categories/${category.category_id}/products`)}>
                        
                        <img src={`http://localhost:5000${category.image_path}`} alt={category.name} className="category-image" />
                        <div className="category-info">
                            <h3 className="category-name">{category.name}</h3>
                            <button className="view-products-button">View Products</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesPage;
