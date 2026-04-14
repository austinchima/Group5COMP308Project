import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    ownerId: { type: String, required: true },
    ownerName: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: '' },
    location: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    deals: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model('Business', businessSchema);