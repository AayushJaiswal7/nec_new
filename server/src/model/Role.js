const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    
  },
  is_deleted: {
    type: DataTypes.ENUM("1", "0"),
    allowNull: false,
    defaultValue: "0",
  },
}, {
  tableName: 'roles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Role;