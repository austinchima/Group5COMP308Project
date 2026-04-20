import mongoose from 'mongoose';

const emergencyAlertSchema = new mongoose.Schema(
  {
    reporterId: { type: String, required: true },
    reporterName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: 'Safety' },
    severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'LOW' },
    location: { type: String, default: '' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('EmergencyAlert', emergencyAlertSchema);