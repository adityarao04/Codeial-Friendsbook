const express = require('express');


const router = express.Router();

const passport = require('passport');

const postsController = require('../controllers/posts_controller');



router.post('/create', passport.checkAuthetication, postsController.create);


router.get('/destroy/:id', passport.checkAuthetication, postsController.destroy);


module.exports = router;