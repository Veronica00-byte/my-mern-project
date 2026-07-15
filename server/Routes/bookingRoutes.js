import express from 'express';
import Booking from '../models/Booking.js';
import QRCode from 'qrcode';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    
    const qrData = `BookingID: ${booking.bookingId}
Name: ${booking.userName}
Date: ${booking.date}
Slot: ${booking.slot}`;
    
    booking.qrCode = await QRCode.toDataURL(qrData);
    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

export default router;