import mongoose from 'mongoose';

interface ConnectionCache {
  isConnected?: number;
}

const connection: ConnectionCache = {};

async function connectToDatabase() {
  if (connection.isConnected) {
    // Use existing database connection
    return;
  }

  // Check if we have a connection string
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    
    // Set connection status
    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

async function disconnectFromDatabase() {
  if (!connection.isConnected) {
    return;
  }
  
  if (process.env.NODE_ENV === 'production') {
    await mongoose.disconnect();
    connection.isConnected = 0;
  }
}

export { connectToDatabase, disconnectFromDatabase }; 