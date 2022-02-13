const express = require('express');


const router = express.Router();

const passport = require('passport');

const commentsController = require('../controllers/comments_controller');


// create comment
router.post('/create', passport.checkAuthetication, commentsController.create);

// delete comment
router.get('/destroy/:id', passport.checkAuthetication, commentsController.destroy);


module.exports = router;