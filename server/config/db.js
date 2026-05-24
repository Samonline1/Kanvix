import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("MONGO_URI is missing. Add it to server/.env before starting the API.");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDb;
