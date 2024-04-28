import React from 'react';
import './AboutUs.css';  
import aboutImage from '../assets/images/bbb.png';

function AboutUs() {
    return (
        <div className="about-us-container">
            
            <h1 className="about-title">About Our Marketplace</h1> 
            
            <hr className="about-divider"/> 
            
            <p className="about-text">
                Our marketplace is dedicated to supporting and promoting Romanian craftsmanship and ingenuity. By focusing solely on Romanian-made products, we offer a platform where local artisans, manufacturers, and creators can showcase their products to a larger audience. Join us in celebrating the rich heritage and innovative spirit of Romania!
            </p>
            
            <img src={aboutImage} alt="About Us" className="about-image" />
          
        </div>
    );
}

export default AboutUs;
