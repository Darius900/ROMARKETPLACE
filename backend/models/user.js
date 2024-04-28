const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');  
const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('buyer', 'seller', 'admin'),
        allowNull: false,
        defaultValue: 'buyer'
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;
