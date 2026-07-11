import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true, default: () => 'BK' + uuidv4().slice(0,6).toUpperCase() },
  ticketId: { type: String }, // keep this if you use it for QR
  templeId: { type: String, required: true },
  templeName: { type: String, required: true },
  userId: { type: String, required: true },
  phone: { type: String, required: true },
  fullName: { type: String },
  date: { type: Date, required: true },
  slot: { type: String, required: true },
  people: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);