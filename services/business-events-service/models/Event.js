import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true }
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    organizerId: { type: String, required: true },
    organizerName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, default: '' },
    date: { type: Date, required: true },
    volunteers: [volunteerSchema],
    suggestedBestTime: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);