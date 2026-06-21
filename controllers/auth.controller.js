import { createUser, loginUser } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateToken } from "../utils/jwt.js";

export const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password, phone } = req.body;

  // calling service
  const user = await createUser(firstName, lastName, phone, username, password);

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: "User created Successfully",
    token,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { phone, username, password } = req.body;

  // service call
  const user = await loginUser({
    phone,
    username,
    password,
    role: "user",
  });

  // token
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
  });
});
