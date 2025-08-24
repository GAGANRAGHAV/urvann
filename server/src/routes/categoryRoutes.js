const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

// Get all unique categories
router.get('/', plantController.getCategories);

module.exports = router;
