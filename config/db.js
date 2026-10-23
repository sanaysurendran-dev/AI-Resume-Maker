const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer;

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resumeai';

  try {
    if (process.env.USE_MEMORY_DB === 'true' || !mongoUri.includes('127.0.0.1')) {
      memoryServer = await MongoMemoryServer.create();
      const uri = memoryServer.getUri();
      await mongoose.connect(uri, { dbName: 'resumeai' });
      console.log('Connected to in-memory MongoDB');
      return;
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (!memoryServer) {
      memoryServer = await MongoMemoryServer.create();
      const uri = memoryServer.getUri();
      await mongoose.connect(uri, { dbName: 'resumeai' });
      console.log('Fell back to in-memory MongoDB');
      return;
    }
    throw error;
  }
}

module.exports = connectDB;
