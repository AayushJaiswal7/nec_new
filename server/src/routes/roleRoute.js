const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');


router.post('/add-role', roleController.addRole);
router.get('/get-roles-details', roleController.getAllRolesDetails);
router.delete('/delete-role/:id', roleController.deleteRole);
module.exports = router;
