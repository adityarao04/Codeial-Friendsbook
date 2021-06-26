const express = require('express');


const router = express.Router();

const passport = require('passport');

const commentsController = require('../controllers/comments_controller');



router.post('/create', passport.checkAuthetication, commentsController.create);



module.exports = router;