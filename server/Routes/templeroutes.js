import express from 'express';
import Temple from '../models/Temple.js';
import Booking from '../models/Booking.js'; // IMPORTANT

const router = express.Router();

// GET all temples
router.get('/', async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single temple by id
router.get('/:id', async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: 'Temple not found' });
    res.json(temple);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new booking
router.post('/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET bookings by phone
router.get('/bookings/:phone', async (req, res) => {
  try {
    const bookings = await Booking.find({ phone: req.params.phone });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
