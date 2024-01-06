import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

export const Error = sequelize.define('error', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    stack: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})