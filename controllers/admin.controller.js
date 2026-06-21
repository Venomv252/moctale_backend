import asyncHandler from "../utils/asyncHandler.js";
import { generateToken } from "../utils/jwt.js";
import { loginUser } from "../services/auth.service.js";

export const adminLogin = asyncHandler(async (req, res) => {
  const { phone, username, password } = req.body;

  const admin = await loginUser({
    phone,
    username,
    password,
    role: "admin",
  });

  //token
  const token = generateToken(admin._id);

  res.status(200).json({
    success: true,
    message: "login successfully",
    token,
  });

  console.log(admin);
  console.log(token);
});

export const adminLogout = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Admin logout successful",
  });
});

export const getAdminProfile = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      username: req.user.username,
      phone: req.user.phone,
      role: req.user.role,
    },
  });
});
