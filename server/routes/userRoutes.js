// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get("/", userController.getUsers);
router.post("/register", userController.createUser);
router.post("/login", userController.userLogin);
router.post("/resetPassword", userController.resetPassword);
router.post("/resetEmail", userController.resetEmail);
router.post("/updateDietaryRestrictions", userController.updateDietaryRestrictions);



module.exports = router;
