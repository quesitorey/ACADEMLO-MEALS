import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

export const Meal = sequelize.define('meals', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER 
    }, 
    restaurantId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
})