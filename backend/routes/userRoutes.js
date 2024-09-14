const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);

// Get user profile (authenticated)
router.get('/profile',  userController.getUserProfile);


module.exports = router;
