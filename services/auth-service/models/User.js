import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['RESIDENT', 'BUSINESS_OWNER', 'COMMUNITY_ORGANIZER'],
      default: 'RESIDENT'
    },
    location: { type: String, default: '' },
    interests: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);