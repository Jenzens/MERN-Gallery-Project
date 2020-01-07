const express = require('express');
const router = express.Router();

//Controller
const UserController = require('../controllers/user')

//Middleware
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UserController.userSignup);

router.post('/login', UserController.userLogin); // add checkAuth 

router.delete('/:userId',  checkAuth, UserController.userDelete);

module.exports = router;

