const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');
const adminAuth = require('../middleware/adminAuth');

// Get all plants with filtering, sorting, and pagination
router.get('/', plantController.getPlants);

// Get single plant by ID
router.get('/:id', plantController.getPlantById);

// Add a new plant (admin only)
router.post('/', adminAuth, plantController.addPlant);

module.exports = router;
