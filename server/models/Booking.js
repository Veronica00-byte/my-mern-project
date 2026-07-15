import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: { 
    type: String, 
    unique: true,
    default: () => 'BK' + Date.now() // Auto generates BK17123456789
  },
  templeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Temple', 
    required: true 
  },
  userName: { 
    type: String, 
    required: true 
  },
  userPhone: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  people: { 
    type: Number, 
    required: true,
    min: 1
  },
  qrCode: { type: String},
  date: { 
    type: String, 
    required: true 
  },
  slot: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);