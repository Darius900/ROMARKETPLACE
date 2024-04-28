const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');  

const Shop = sequelize.define('Shop', {
    shop_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    banner: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    description: DataTypes.TEXT
}, {
   
    tableName: 'shops',
    createdAt: 'created_at',  
    updatedAt: 'updated_at', 
    timestamps: true,  
    underscored: true  
});

module.exports = Shop;
