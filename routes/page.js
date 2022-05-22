const express = require('express');

const router = express.Router();

const pageController = require('../controllers/page_controller');

console.log('wellness router loaded');

router.get('/wellness', pageController.wellness);

router.get('/therapy', pageController.therapy);




module.exports = router;