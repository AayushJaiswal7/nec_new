const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");

const Site = sequelize.define("site", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    siteCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    siteName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.ENUM("India", "USA", "UK", "Other"),
        allowNull: true,
    },
    latLong: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    document: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    isDeleted: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "0",
    },
}, {
    tableName: "sites"
});

module.exports = Site;
