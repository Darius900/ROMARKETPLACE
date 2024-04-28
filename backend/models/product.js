const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2)
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    shop_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updated_at: {
        type: DataTypes.DATE,
        field: 'updated_at'
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    
    tableName: 'products'
});

module.exports = Product;
