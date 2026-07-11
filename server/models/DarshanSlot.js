const mongoose = require('mongoose');
const slotSchema = new mongoose.Schema({
  temple: { type: mongoose.Schema.Types.ObjectId, ref: 'Temple', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  availableSeats: { type: Number, required: true },
  bookedSeats: { type: Number, default: 0 },
  price: { type: Number, required: true }
}, { timestamps: true });
slotSchema.index({ temple: 1, date: 1, startTime: 1 }, { unique: true });
module.exports = mongoose.model('DarshanSlot', slotSchema);