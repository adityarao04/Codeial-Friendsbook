const passport = require('passport');


const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');

// now create authentication function
// 1. auth using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    },
    function(req, email, password, done) {
        //   find a user and establish the identity
        User.findOne({ email: email }, function(err, user) {
            if (err) {
                req.flash('error', err);
                return done(err);
            }

            if (!user || user.password != password) {
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));


// 2. Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});



// 3. Deserializing the user from the key
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        // done(null, user) ---> "null" because there is no error and "user" because user is found
        return done(null, user);
    });
});



// check if user is authenticated (will be used as a middleware)
passport.checkAuthetication = function(req, res, next) {
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in')
}



// set the users
passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookies
        // and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;