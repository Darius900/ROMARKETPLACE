
import React, { useState } from 'react';
import illustration from '../assets/images/aaa.png';
import './Home.css';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState(''); 

    const handleSearch = () => {
        console.log("Searching for:", searchTerm); 
    };

    return (
        <div>
            <div className="illustration-container">
                <img src={illustration} alt="Romanian Marketplace Illustration" className="illustration" />

                <div className="search-container">
                    <h2 className="search-title">Explore Our Marketplace</h2>
                    <div className="search-bar-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search for products..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <button onClick={handleSearch} className="search-button">Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
