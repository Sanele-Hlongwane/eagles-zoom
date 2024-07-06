import mongoose from 'mongoose';

let isConnected = false;

export async function connect() {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  const mongoURI = process.env.MONGODB_URL;
  if (!mongoURI) {
    throw new Error('MongoDB connection string is not provided in environment variables');
  }

  try {
    await mongoose.connect(mongoURI);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
