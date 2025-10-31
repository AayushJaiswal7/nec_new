// models/index.js - Associations
const sequelize = require('../config/dbconfig');
const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const RolePermission = require('./RolePermission');
const Module = require('./Module');

// User -> Role (Many-to-One / One-to-Many)
User.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'role'
});

Role.hasMany(User, {
  foreignKey: 'role_id',
  as: 'users'
});

// Role <-> Permission (Many-to-Many)
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'role_id',
  otherKey: 'permission_id',
  as: 'permissions'
});

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permission_id',
  otherKey: 'role_id',
  as: 'roles'
});

// Module -> Permission (One-to-Many)
Module.hasMany(Permission, {
  foreignKey: 'module_id',
  as: 'permissions'
});

Permission.belongsTo(Module, {
  foreignKey: 'module_id',
  as: 'module'
});

module.exports = {
  sequelize,
  User,
  Role,
  Permission,
  RolePermission,
  Module  
};