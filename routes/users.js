const express = require('express');
// const { Passport } = require('passport');

const router = express.Router();

const passport = require('passport');


const usersController = require('../controllers/users_controller');


console.log('user router loaded');

router.get('/profile/:id', passport.checkAuthetication, usersController.profile);
router.post('/update/:id', passport.checkAuthetication, usersController.update);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', {
        failureRedirect: '/users/sign-in'
    }
), usersController.createSession);



// sign-out route

router.get('/sign-out', usersController.destroySession);

// google auth
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/users/sign-in'
}), usersController.createSession);

module.exports = router;