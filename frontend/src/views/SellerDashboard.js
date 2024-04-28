import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom'; 

import './SellerDashboard.css';  

function SellerDashboard() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate(); 
    const [shop, setShop] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category_id: '' });
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role === 'seller') {
            fetchShopAndProducts();
            fetchCategories();
        }
    }, [user]);

    const fetchShopAndProducts = async () => {
        try {
            const shopResponse = await fetch(`http://localhost:5000/api/shops/user/${user.user_id}`);
            if (!shopResponse.ok) throw new Error('Failed to fetch shop');
            const shopData = await shopResponse.json();
            setShop(shopData);

            const productsResponse = await fetch(`http://localhost:5000/api/shops/${shopData.shop_id}/products`);
            if (!productsResponse.ok) throw new Error('Failed to fetch products');
            const productsData = await productsResponse.json();
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching shop or products:', error);
        } finally {
            setLoading(false);
        }
    };

     
     const goToSellerShop = () => {
        navigate('/sellershop'); 
    };


    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/categories');
            if (!response.ok) throw new Error('Failed to fetch categories');
            const categoriesData = await response.json();
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/shops/${shop.shop_id}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });
            if (!response.ok) throw new Error('Add product failed');
            const productData = await response.json();
            setProducts([...products, productData]);
            setNewProduct({ name: '', description: '', price: '', category_id: '' });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    // Handle delete product
    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/shops/${shop.shop_id}/products/${productId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Delete product failed');
            setProducts(products.filter(product => product.product_id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Handle edit product
    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    // Handle update product
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/shops/${shop.shop_id}/products/${editingProduct.product_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingProduct)
            });
            if (!response.ok) throw new Error('Update product failed');
            const updatedProduct = await response.json();
            setProducts(products.map(product => product.product_id === updatedProduct.product_id ? updatedProduct : product));
            setEditingProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Handle edit form input changes
    const handleEditInputChange = (e) => {
        setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="seller-dashboard">
            <h1>Seller Dashboard</h1>
            <button onClick={goToSellerShop}>Customize Your Shop</button> 
            {shop ? (
                <>
                    <div className="shop-details">
                        <h2>{shop.name}</h2>
                        <p>{shop.description}</p>
                    </div>
                    <form onSubmit={handleAddProduct} className="add-product-form">
                        <input
                            className='inputSD'
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            className='inputSD'
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            className='inputSD'
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            required
                        />
                        <select
                            className='selectSD'
                            name="category_id"
                            value={newProduct.category_id}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a Category</option>
                            {categories.map(category => (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <button className="add-product-button" type="submit">Add Product</button>
                    </form>
                    <div className="product-list">
                        {products.map(product => (
                            <div key={product.product_id} className="product-card">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p className="product-price">Price: {product.price}</p>
                                <button onClick={() => handleEditProduct(product)} className="edit-product-button">Edit</button>
                                <button onClick={() => handleDeleteProduct(product.product_id)} className="delete-product-button">Delete</button>
                            </div>
                        ))}
                    </div>
                    {editingProduct && (
                        <form onSubmit={handleUpdateProduct} className="edit-product-form">
                            <input
                                className='inputSD'
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={editingProduct.name}
                                onChange={handleEditInputChange}
                                required
                            />
                            <input
                                className='inputSD'
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={editingProduct.description}
                                onChange={handleEditInputChange}
                                required
                            />
                            <input
                                className='inputSD'
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={editingProduct.price}
                                onChange={handleEditInputChange}
                                required
                            />
                            <button className="update-product-button" type="submit">Update Product</button>
                        </form>
                    )}
                </>
            ) : (
                <p className="no-shop-message">No shop found. Please create a shop first.</p>
            )}
        </div>
    );
    
}

export default SellerDashboard;
