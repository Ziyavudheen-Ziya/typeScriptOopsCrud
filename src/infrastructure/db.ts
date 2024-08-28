import mongoose from 'mongoose';
import { config } from '../../config';

export const connectDb = async () => {
  try {
    if (!config.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the configuration.');
    }
    await mongoose.connect(config.MONGO_URI);
    console.log('Database Connection Successful');
  } catch (error) {
    console.error('Error in DB connection', error);
  }
};
