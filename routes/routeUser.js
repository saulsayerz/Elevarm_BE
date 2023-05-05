const express = require('express');
const router = express.Router();
const userService = require('../services/user');

router.post('/', async (req, res) => {
  try {
    const { id, name, password, username, email } = req.body;
    if (!id) {
      res.status(400).json({ status: 'error', message: 'Missing id' });
      return;
    }
    if (!name) {
      res.status(400).json({ status: 'error', message: 'Missing name' });
      return;
    }
    if (!password) {
      res.status(400).json({ status: 'error', message: 'Missing password' });
      return;
    }
    if (!username) {
      res.status(400).json({ status: 'error', message: 'Missing username' });
      return;
    }
    if (!email) {
      res.status(400).json({ status: 'error', message: 'Missing email' });
      return;
    }

    const result = await userService.insertUser({ id, name, password, username, email });
    res.status(200).json({ status: 'success', message: 'User created successfully', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to create user', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await userService.findAllUsers();
    res.status(200).json({ status: 'success', message: 'Users retrieved successfully', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to retrieve users', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.status(200).json({ status: 'success', message: 'User deleted successfully', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to delete user', error });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, password, username, email } = req.body;
    if (!name) {
      res.status(400).json({ status: 'error', message: 'Missing name' });
      return;
    }
    if (!password) {
      res.status(400).json({ status: 'error', message: 'Missing password' });
      return;
    }
    if (!username) {
      res.status(400).json({ status: 'error', message: 'Missing username' });
      return;
    }
    if (!email) {
      res.status(400).json({ status: 'error', message: 'Missing email' });
      return;
    }

    const result = await userService.updateUser(userId, { name, password, username, email });
    res.status(200).json({ status: 'success', message: 'User updated successfully', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to update user', error });
  }
});

router.get('/:id', async (req, res) => {
  const result = await userService.findById(req.params.id);
  if (result) {
    res.status(200).json({ status: 'success', message: 'User retrieved successfully', data: result });
  } else {
    res.status(404).json({ status: 'error', message: 'User not found' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { id, name, password, username, email } = req.body;
    if (!id) {
      res.status(400).json({ status: 'error', message: 'Missing id' });
      return;
    }
    if (!name) {
      res.status(400).json({ status: 'error', message: 'Missing name' });
      return;
    }
    if (!password) {
      res.status(400).json({ status: 'error', message: 'Missing password' });
      return;
    }
    if (!username) {
      res.status(400).json({ status: 'error', message: 'Missing username' });
      return;
    }
    if (!email) {
      res.status(400).json({ status: 'error', message: 'Missing email' });
      return;
    }

    const result = await userService.insertUser({ id, name, password, username, email });
    const token = await jwtservice.generateAccessToken({ user_id: id, username: username}, 1800);
    res.status(200).json({ status: 'success', message: 'User registered successfully', data: token });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to create user', error });
  }
});

router.post('/login', async (req, res) => {
  const user = await userService.loginUser(req.body);
  if (user) {
    const token = await jwtservice.generateAccessToken({ user_id: user.id, username: user.username}, 1800);
    res.json({ status: 'success', message: 'User logged in successfully', data: token });
  } else {
    res.status(401).json({ status: 'error', message: 'Invalid username or password' });
  }
});

module.exports = router;
