import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer;

async function connectWithFallback(preferredUri, dbName, label) {
  if (preferredUri) {
    try {
      await mongoose.connect(preferredUri, { serverSelectionTimeoutMS: 4000 });
      console.log(`${label} DB connected`);
      return;
    } catch (error) {
      console.warn(`${label} DB unavailable at configured URI, switching to in-memory MongoDB:` , error.message);
    }
  }

  memoryServer = await MongoMemoryServer.create({
    instance: { dbName },
  });
  const memoryUri = memoryServer.getUri();
  console.log(`${label} service using in-memory MongoDB`);
  await mongoose.connect(memoryUri);
  console.log(`${label} DB connected`);
}

const connectDB = async () => {
  try {
    await connectWithFallback(process.env.MONGO_URI, 'the-commons-auth', 'Auth');
  } catch (error) {
    console.error('Auth DB connection error:', error.message);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  if (memoryServer) {
    await memoryServer.stop();
  }
});

export default connectDB;
