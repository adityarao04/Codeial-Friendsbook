const Post = require('../models/post')

module.exports.home = function(req, res) {
    // check cookies
    // console.log(req.cookies);
    // change cookies
    // res.cookie('user_id', 25);
    // res.cookie('new_id', 4678);

    // return res.end('<h1>Express is up for codeial</h1>');
    // Post.find({}, function(err, posts) {
    //     return res.render('home', {
    //         title: " Friendsbook | Home",
    //         posts: posts
    //     });
    // })

    // populate the user of each post
    Post.find({}).populate('user').exec(function(err, posts) {
        return res.render('home', {
            title: " Friendsbook | Home",
            posts: posts
        });
    })


}



// module.exports.actionName = function(req,res){}