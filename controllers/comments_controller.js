const Comment = require('../models/comment');
const Post = require('../models/post');
var request = require('request');
const commentsMailer = require('../mailers/comments_mailer');
const Like = require('../models/like');



module.exports.create = async function(req, res) {

    try {
        let post = await Post.findById(req.body.post);
        // sentiment analysis API
        let postData = `http://127.0.0.1:5000/?q=\'${req.body.content}\'`
        var options = {
            'method': 'GET',
            'url': postData,
            'headers': {}
        };

        request(options, async function(error, response) {
            debugger;
            if (error) throw new Error(error);
            let responseJson = JSON.parse(response.body)
            console.log(req.body.content);
            console.log(responseJson.sentiment);
            if (post && responseJson.sentiment === 'Positive') {
                let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });

                post.comments.push(comment);
                post.save();

                // Similar for comments to fetch the user's id!
                comment = await comment.populate('user', 'name email').execPopulate();
                commentsMailer.newComment(comment);
                if (req.xhr) {

                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Post created!"
                    });
                }


                req.flash('success', 'Comment published!');

                res.redirect('/');
            } else {
                req.flash('error', 'Comment of Bad sentiment');

                res.redirect('/');
            }
        });
    } catch (err) {
        req.flash('error', err);
        return;
    }

}


module.exports.destroy = async function(req, res) {

    try {
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id) {

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, {
                $pull: {
                    comments: req.params.id
                }
            });

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({ likeable: comment._id, onModel: 'Comment' });

            // send the comment id which was deleted back to the views
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        } else {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }

}