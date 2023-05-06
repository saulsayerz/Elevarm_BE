const express = require('express');
const router = express.Router();
const {
  insertRestaurant,
  findAllRestaurants,
  deleteRestaurant,
  updateRestaurant
} = require('../services/restaurant');
const jwtservice = require('../middleware/jwt');

// Create a new restaurant
router.post('/',jwtservice.authenticateToken, async (req, res) => {
  try {
    const result = await insertRestaurant(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating restaurant' });
  }
});

// Get all restaurants
router.get('/',jwtservice.authenticateToken, async (req, res) => {
  try {
    const result = await findAllRestaurants();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting restaurants' });
  }
});

// Delete a restaurant and its menu items
router.delete('/:restaurantId',jwtservice.authenticateToken, async (req, res) => {
  try {
    const result = await deleteRestaurant(req.params.restaurantId);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting restaurant' });
  }
});

// Update a restaurant
router.put('/:restaurantId',jwtservice.authenticateToken, async (req, res) => {
  try {
    const result = await updateRestaurant(req.params.restaurantId, req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating restaurant' });
  }
});

module.exports = router;
