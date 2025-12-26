const express = require('express');

const router = express.Router();

const User = require('../models/user');
const verifyToken = require('../middleware/verify-token');

router.get('/', async (req, res) => {
  try {
    // Get a list of all users, but only return their username and _id
    const users = await User.find({}, 'username');

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/current-user',verifyToken, async (req, res) => {
  try {
    // Get a list of all users, but only return their username and _id
    const user = await User.findById(req.user._id).select("-hashedPassword");
    if (!user) return res.status(404).json({ err: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Get a list of all users, but only return their username and _id
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;