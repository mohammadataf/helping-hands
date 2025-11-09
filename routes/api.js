const express = require('express');
const router = express.Router();
const LostFound = require('../models/LostFound');
const Roommate = require('../models/Roommate');
const Exchange = require('../models/Exchange');

// Lost & Found Routes
router.post('/lostfound', async (req, res) => {
  try {
    const newItem = new LostFound(req.body);
    await newItem.save();
    
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/lostfound', async (req, res) => {
  const items = await LostFound.find().sort({ createdAt: -1 });
  res.json(items);
});

// Roommate Routes
router.post('/roommate', async (req, res) => {
  try {
    const newPost = new Roommate(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get('/roommate', async (req, res) => {
  const posts = await Roommate.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Exchange Routes
router.post('/exchange', async (req, res) => {
  try {
    const newPost = new Exchange(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/exchange', async (req, res) => {
  const posts = await Exchange.find().sort({ createdAt: -1 });
  res.json(posts);
});

module.exports=router;