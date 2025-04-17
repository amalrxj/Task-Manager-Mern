const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbURI = process.env.DB_URI;

if (!dbURI) {
  throw new Error("DB_URI is not defined in the environment variables");
}

const connectDB = async () => {
  try {
    console.log("MongoDB connecting...");
    await mongoose.connect(dbURI, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
