const passport = require('passport');


const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');

// now create authentication function
// 1. auth using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        //   find a user and establish the identity
        User.findOne({ email: email }, function(err, user) {
            if (err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid Username/Password');
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



module.exports = passport;