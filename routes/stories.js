const express = require('express');

const router = express.Router();

const storiesController = require('../controllers/stories_controllers');

console.log('stories router loaded');

router.get('/story', storiesController.stories);




module.exports = router;