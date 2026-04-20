import mongoose from 'mongoose';

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  if (memoryServer) {
    await memoryServer.stop();
  }
});

export default connectDB;
