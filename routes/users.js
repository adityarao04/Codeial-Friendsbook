const express = require('express');

const router = express.Router();


const usersController = require('../controllers/users_controller');


console.log('user router loaded');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-up', usersController.signIn);



module.exports = router;