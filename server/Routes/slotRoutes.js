const express = require('express');
const router = express.Router();
const DarshanSlot = require('../models/DarshanSlot');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  const { templeId, date } = req.query;
  const slots = await DarshanSlot.find({ temple: templeId, date: new Date(date) });
  res.json(slots);
});

router.post('/', protect, authorize('ORGANIZER', 'ADMIN'), async (req, res) => {
  const slot = await DarshanSlot.create(req.body);
  res.status(201).json(slot);
});
module.exports = router;