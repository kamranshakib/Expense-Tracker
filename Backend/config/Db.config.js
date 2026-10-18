import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not configured");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    throw error;
  }
};

export default connectDB;