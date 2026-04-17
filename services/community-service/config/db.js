import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Community DB connected');
  } catch (error) {
    console.error('Community DB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;