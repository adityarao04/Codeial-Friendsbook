const express = require('express');

const router = express.Router();

const wellnessController = require('../controllers/page_controller');

console.log('wellness router loaded');

router.get('/wellness', wellnessController.wellness);




module.exports = router;