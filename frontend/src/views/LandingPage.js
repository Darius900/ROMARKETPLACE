
import React from 'react';
import Home from './Home';
import AboutUs from './AboutUs';
import DividerImage from '../assets/images/divider.png';

function LandingPage() {
    return (
        <div>
            <Home />
            <img src={DividerImage} alt="Traditional Wooden Bar Divider" style={{ width: '100%', height: '200px', marginTop: '-230px', display: 'block' }} />
            <AboutUs />
        </div>
    );
}

export default LandingPage;
