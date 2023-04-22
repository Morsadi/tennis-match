import mongoose from "mongoose";

const connectMongo = async () => {
  const url = 'mongodb://localhost:27017/tennis-app';
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}

export default connectMongo;
