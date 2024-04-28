const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');  

const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: DataTypes.INTEGER,
    order_status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false
    },
    order_date: DataTypes.DATE
}, {
    timestamps: false,
    tableName: 'orders'
});

module.exports = Order;
