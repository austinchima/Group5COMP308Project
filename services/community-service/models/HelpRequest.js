import mongoose from 'mongoose';

const helpRequestSchema = new mongoose.Schema(
  {
    requesterId: { type: String, required: true },
    requesterName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    neededSkills: [{ type: String }],
    location: { type: String, default: '' },
    matchedVolunteers: [
      {
        userId: String,
        userName: String
      }
    ],
    status: {
      type: String,
      enum: ['OPEN', 'IN_PROGRESS', 'CLOSED'],
      default: 'OPEN'
    }
  },
  { timestamps: true }
);

export default mongoose.model('HelpRequest', helpRequestSchema);