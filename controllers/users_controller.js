// get user model
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });

    })
}


module.exports.update = async function(req, res) {
    // if (req.user.id == req.params.id) {

    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    //         return res.redirect('back');
    //     });
    // } else {
    //     return res.status(401).send('Unauthorized');
    // }

    if (req.user.id == req.params.id) {


        try {
            // console.log(User);
            let user = await User.findById(req.params.id);


            User.uploadedAvatar(req, res, function(err) {
                if (err) {
                    console.log("****Multer Error: ", err);
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                    }

                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename
                    console.log(user.avatar);
                }
                user.save();
                return res.redirect('back');
            })


        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }

    } else {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }

}

// render the sign up page
module.exports.signUp = function(req, res) {
    // if user is authenticated just take them back to profile
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');

    }

    return res.render('user_sign_up', {
        title: "MEET+ | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req, res) {
    // if user is authenticated just take them back to profile
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "MEET+ | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res) {


    if (req.body.password !== req.body.confirm_password) {
        // console.log(req.body);
        return res.redirect('back');
    }

    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) {
            console.log('error in finding user in signing up');
            return;
        }

        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) {
                    console.log('error in creating user While signing up');
                    return;
                }

                return res.redirect('/users/sign-in')
            })
        } else {
            return res.redirect('back');
        }

    });
}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}






module.exports.destroySession = function(req, res) {
    // using passport function logout()
    req.logout();
    req.flash('success', 'You have Logged Out');

    return res.redirect('/users/sign-in');
}