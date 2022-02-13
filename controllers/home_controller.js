const Post = require('../models/post')
const User = require('../models/user')
module.exports.home = async function(req, res) {
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

    try {
        // populate the user of each post
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
        let users = await User.find({});


        return res.render('home', {
            title: " MEET+ | Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {

        console.log("Error", err);
        return;
    }




    // .exec(function(err, posts) {
    //     User.find({}, function(err, users) {
    //         return res.render('home', {
    //             title: " MEET+ | Home",
    //             posts: posts,
    //             all_users: users
    //         });

    //     })

    // })


}



// module.exports.actionName = function(req,res){}