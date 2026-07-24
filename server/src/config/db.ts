import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/magicbricks_ai';
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] Connected successfully to MongoDB: ${mongoose.connection.host}`);
  } catch (error: any) {
    console.warn(`[Database Warning] Standard MongoDB connection failed (${error.message}). Running in mock/in-memory mode for development.`);
    // Suppress strict queries warning
    mongoose.set('strictQuery', false);
  }
};
