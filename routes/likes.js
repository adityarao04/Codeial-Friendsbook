const express = require('express');

const router = express.Router();
const likesController = require('../controllers/likes_controller');


router.get('/toggle', likesController.toggleLike);
console.log('likes router loaded');

module.exports = router;