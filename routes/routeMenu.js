const express = require('express');
const router = express.Router();
const menu = require('../services/menu');

// Insert a new menu item
router.post('/menu', async (req, res) => {
  try {
    const result = await menu.insertMenu(req.body);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Get all menu items
router.get('/menu', async (req, res) => {
  try {
    const result = await menu.findAllMenus();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Get all menu items by restaurant ID
router.get('/menu/:restaurantId', async (req, res) => {
  try {
    const result = await menu.findMenusByRestaurantId(req.params.restaurantId);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Delete a menu item
router.delete('/menu/:menuId', async (req, res) => {
  try {
    const result = await menu.deleteMenu(req.params.menuId);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Update a menu item
router.put('/menu/:menuId', async (req, res) => {
  try {
    const result = await menu.updateMenu(req.params.menuId, req.body);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Get a menu item by ID
router.get('/menu-item/:menuItemId', async (req, res) => {
  try {
    const result = await menu.findMenuItemById(req.params.menuItemId);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
