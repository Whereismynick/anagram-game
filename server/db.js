import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;

try {
  await mongoose.connect(url);
  console.log("MongoDB connected");
} catch (err) {
  console.log("MongoDB connection error:", err);
}

export default mongoose;
