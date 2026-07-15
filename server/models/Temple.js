import mongoose from 'mongoose';

const templeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
}, { timestamps: true });

export default mongoose.model('Temple', templeSchema);