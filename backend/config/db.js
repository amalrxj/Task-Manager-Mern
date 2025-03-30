const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

if (!process.env.DB_URI) {
  throw new Error("DB_URI is not defined in the environment variables");
}

const dbURI = process.env.DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {});
    console.log("MongoDB connecting...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
