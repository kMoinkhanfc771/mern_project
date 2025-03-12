import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log('✅ MongoDB Connected!');
    console.log(`Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
