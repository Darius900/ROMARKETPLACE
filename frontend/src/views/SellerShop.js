import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import './SellerShop.css';




function SellerShop() {
    const { user } = useContext(UserContext);
    const [shopDetails, setShopDetails] = useState({ description: '' });
    const [bannerFile, setBannerFile] = useState(null);
    

    const handleDescriptionChange = (e) => {
        setShopDetails({ ...shopDetails, description: e.target.value });
    };

    const handleBannerChange = (e) => {
        setBannerFile(e.target.files[0]);
    };

    const uploadBanner = async () => {
        const formData = new FormData();
        formData.append('banner', bannerFile);

        const response = await fetch(`http://localhost:5000/api/shops/${user.shop_id}/uploadBanner`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Failed to upload banner');
        return response.json();
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const bannerResponse = await uploadBanner();
            const updatedShopDetails = {
                ...shopDetails,
                banner: bannerResponse.bannerFilename
            };

            const customizationResponse = await fetch(`http://localhost:5000/api/shops/${user.shop_id}/customize`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedShopDetails)
            });

            if (!customizationResponse.ok) throw new Error('Failed to update shop customization');
            console.log('Shop customization updated successfully');
        } catch (error) {
            console.error('Error updating shop customization:', error);
            console.log(user);

        }
    };

    return (
        <div className="seller-shop">
            <h1>Customize Your Shop</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="description"
                    placeholder="Shop Description"
                    value={shopDetails.description}
                    onChange={handleDescriptionChange}
                />
                <input
                    type="file"
                    name="banner"
                    onChange={handleBannerChange}
                />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default SellerShop;
