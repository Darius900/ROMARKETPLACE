import React from 'react';
import frame from '../assets/images/6543.png';
import './CategoryFrame.css';



const CategoryFrame = () => {
    return (
        <div className="category-frame">
            <img src={frame} alt="Category Frame" />
        </div>
    );
}

export default CategoryFrame;
