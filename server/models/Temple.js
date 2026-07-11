import mongoose from 'mongoose';

const templeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Temple name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  darshanTimings: {
    type: String,
    default: '6:00 AM - 8:00 PM'
  }
}, {
  timestamps: true
});

const Temple = mongoose.model('Temple', templeSchema);

export default Temple;