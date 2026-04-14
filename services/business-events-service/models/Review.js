import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    businessId: { type: String, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    sentiment: { type: String, default: '' },
    response: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);