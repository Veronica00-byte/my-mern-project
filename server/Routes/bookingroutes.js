const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const DarshanSlot = require('../models/DarshanSlot');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('USER'), async (req, res) => {
  const { slotId, devoteeCount } = req.body;
  const slot = await DarshanSlot.findById(slotId);
  if (slot.bookedSeats + devoteeCount > slot.availableSeats) {
    return res.status(400).json({ message: 'Slot full' });
  }
  slot.bookedSeats += devoteeCount;
  await slot.save();
  
  const booking = await Booking.create({
    user: req.user._id,
    slot: slotId,
    devoteeCount,
    totalAmount: slot.price * devoteeCount
  });
  res.status(201).json(booking);
});

router.get('/my', protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('slot');
  res.json(bookings);
});
module.exports = router;
