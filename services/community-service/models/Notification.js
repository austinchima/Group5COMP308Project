import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipientId: { type: String, required: true },
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['LIKE', 'COMMENT', 'OFFER_HELP', 'VOLUNTEER', 'BUSINESS_REVIEW', 'NEWS'],
      required: true 
    },
    message: { type: String, required: true },
    link: { type: String, default: '' },
    isRead: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
