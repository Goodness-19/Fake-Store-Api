import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class Database {
  static async connect() {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
  }
}

export default Database;