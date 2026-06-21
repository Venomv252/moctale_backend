import User from "../models/User.js";
import bcrypt from "bcrypt";

export const createUser = async (
  firstName,
  lastName,
  phone,
  username,
  password,
) => {
  const existingUser = await User.findOne({ phone });

  if (existingUser) {
    const err = new Error("User already exists");
    err.status = 400;
    throw err;
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

  return newUser;
};

export const loginUser = async ({ phone, username, password, role }) => {
  // find identifier
  const identifier = phone || username;

  // build query dynamically
  const query = {
    role,
    $or: [],
  };

  // if identifier is numeric -> search by phone
  if (!isNaN(identifier)) {
    query.$or.push({
      phone: Number(identifier),
    });
  }

  // always allow username search
  query.$or.push({
    username: identifier?.toLowerCase().trim(),
  });

  // find user
  const user = await User.findOne(query);

  if (!user) {
    throw new Error("User not found");
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};
