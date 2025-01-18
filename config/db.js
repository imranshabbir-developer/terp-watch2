import mongoose from "mongoose";
import colors from 'colors'

// Creating a Database connection / Seperate DB_URI add in .env file
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected successfully at ${mongoose.connection.host}`.bgMagenta );
  } catch (error) {
    console.error(`MongoDB connection error`.bgRed);
    process.exit(1);
  }
};

export default connectDB;
