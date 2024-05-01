// routes/userRoutes.js

/**
 * @module Routes
 * @description Defines routes for user-related functionality.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * Route to get all users.
 * @name GET /users
 */
router.get("/", userController.getUsers);

/**
 * Route to register a new user.
 * @name POST /users/register
 */
router.post("/register", userController.createUser);

/**
 * Route to log in a user.
 * @name POST /users/login
 */
router.post("/login", userController.userLogin);

/**
 * Route to reset a user's password.
 * @name POST /users/resetPassword
 */
router.post("/resetPassword", userController.resetPassword);

/**
 * Route to reset a user's email address.
 * @name POST /users/resetEmail
 */
router.post("/resetEmail", userController.resetEmail);

/**
 * Route to update a user's dietary restrictions.
 * @name POST /users/updateDietaryRestrictions
 */
router.post("/updateDietaryRestrictions", userController.updateDietaryRestrictions);

/**
 * Route to get all users (duplicate).
 * @name POST /users/getAllUsers
 */
router.post("/getAllUsers", userController.getUsers);



module.exports = router;
