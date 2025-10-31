const express = require('express');
const router = express.Router();
const authorizationController = require('../controllers/authorizationController');


router.get('/get-all-roles', authorizationController.getAllRoles);
router.get('/get-all-modules-with-permissions', authorizationController.getModulesWithPermissions);
router.get('/get-role-permissions/:roleId', authorizationController.getRolePermissions);
router.post('/save-role-permissions', authorizationController.saveRolePermissions);


module.exports = router;
