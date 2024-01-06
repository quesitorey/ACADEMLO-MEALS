import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

export const Order = sequelize.define('orders', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    mealId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }, 
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'cancelled', 'completed'),
        defaultValue: 'active'
    }
})