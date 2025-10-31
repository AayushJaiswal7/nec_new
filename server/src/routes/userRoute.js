const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');


router.post('/login', userController.loginUser);
router.post("/add-user", userController.addUser);
router.get("/get-all-user", userController.getAllUser);
router.post("/reset-password", userController.resetPassword);
router.post("/check-is-first-login", userController.checkIsFirstLogin);
router.post("/edit-user/:id", userController.editUser);
router.delete("/delete-user/:id", userController.deleteUser);
router.get("/get-user-id", userController.userIdGenerator);   

module.exports = router;
