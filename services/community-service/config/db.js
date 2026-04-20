import mongoose from 'mongoose';

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  try {
    await mongoose.connect(uri);
    console.log('Community DB connected successfully');
  } catch (error) {
    console.error('Community DB connection error:', error.message);
    process.exit(1);
  }
}

export default connectDB;
