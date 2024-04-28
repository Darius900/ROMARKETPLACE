

import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <p className="footer-text">© 2023 Romanian Marketplace. All rights reserved.</p>
            <div className="footer-links">
            <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
            <a href="/terms-of-service" className="footer-link">Terms of Service</a>
            <a href="/contact-us" className="footer-link">Contact Us</a>

            </div>
        </footer>
    );
}

export default Footer;
