import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config({
  path: "./.env",
});

console.log(process.env.MONGO_URI);

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await User.findOne({
      username: "admin",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      firstName: "Aryan",
      lastName: "Admin",
      phone: 9999999999,
      username: "admin",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    console.log("Admin seeded successfully");
    console.log(admin);

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();
