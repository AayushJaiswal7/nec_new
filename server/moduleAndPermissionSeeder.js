require('dotenv').config();
const sequelize = require('./src/config/dbconfig');
const Module = require('./src/model/Module');
const Permission = require('./src/model/Permission');

// this is just a sample seeder file will we be modified for the actual seeder

(async () => {
  try {
    // Ensure tables exist
    await sequelize.sync({ alter: true });

    // Seed Modules
    const modules = await Module.bulkCreate(
      [
        { module_name: 'User Management', description: 'Manage users', is_active: true },
        { module_name: 'Reports', description: 'Reports module', is_active: true },
        { module_name: 'Settings', description: 'System settings', is_active: true },
      ],
      { ignoreDuplicates: true }
    );

    // Seed Permissions
    await Permission.bulkCreate(
      [
        // User Management
        { module_id: 1, permission_name: 'View Users', permission_key: 'user.view', description: 'View all users' },
        { module_id: 1, permission_name: 'Add User', permission_key: 'user.add', description: 'Add new users' },
        { module_id: 1, permission_name: 'Edit User', permission_key: 'user.edit', description: 'Edit existing users' },
        { module_id: 1, permission_name: 'Delete User', permission_key: 'user.delete', description: 'Delete users' },

        // Reports
        { module_id: 2, permission_name: 'View Reports', permission_key: 'reports.view', description: 'View reports' },
        { module_id: 2, permission_name: 'Download Reports', permission_key: 'reports.download', description: 'Download reports' },

        // Settings
        { module_id: 3, permission_name: 'Update Settings', permission_key: 'settings.update', description: 'Modify settings' },
      ],
      { ignoreDuplicates: true }
    );

    console.log('Seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
})();
