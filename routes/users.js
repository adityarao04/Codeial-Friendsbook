const express = require('express');
// const { Passport } = require('passport');

const router = express.Router();

const passport = require('passport');


const usersController = require('../controllers/users_controller');


console.log('user router loaded');

router.get('/profile', passport.checkAuthetication, usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/users/sign-in' }
), usersController.createSession);



// sign-out route

router.get('/sign-out', usersController.destroySession);

module.exports = router;