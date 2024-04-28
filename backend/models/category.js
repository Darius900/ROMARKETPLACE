const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    created_at: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updated_at: {
        type: DataTypes.DATE,
        field: 'updated_at'
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: true 
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'categories'
});

module.exports = Category;
