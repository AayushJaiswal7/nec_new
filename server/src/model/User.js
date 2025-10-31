const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");

const User = sequelize.define("user", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // references: {
        //     model: "roles",
        //     key: "id",
        // },
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    is_first_login: {
        type: DataTypes.ENUM("1", "0"), 
        allowNull: false,
        defaultValue: "1",
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    initial_password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    valid_from: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    valid_to: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.ENUM("1", "0"),
        allowNull: false,
        defaultValue: "1",
    },
    is_deleted: {
        type: DataTypes.ENUM("1", "0"),
        allowNull: false,
        defaultValue: "0",
    },
}, {
    tableName: "users"
});

module.exports = User;
