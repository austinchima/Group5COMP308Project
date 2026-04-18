import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema({
  organizerId: { type: String, required: true },
  organizerName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: '' },
  date: { type: String, required: true },
  time: { type: String, default: '' },
  location: { type: String, default: '' },
  capacity: { type: Number, default: 0 },
  volunteers: { type: [volunteerSchema], default: [] },
  suggestedBestTime: { type: String, default: '' },
  createdAt: { type: String, default: () => new Date().toISOString() },
});

export default mongoose.model('Event', eventSchema);