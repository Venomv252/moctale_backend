import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {

    const { formData } = req.body;
    const { firstName, lastName, phone, username, password } = formData;

    if (!firstName || !lastName || !phone || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      phone,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
    console.log(newUser);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const login = async (req, res) => {
  res.json({ message: "Login logic here" });
};


export const forgotPassword = async (req, res) => {
  res.json({ message: "Forgot password logic here" });
};