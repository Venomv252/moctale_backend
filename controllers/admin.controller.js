import asyncHandler from "../utils/asyncHandler.js";
import { generateToken } from "../utils/jwt.js";
import { loginUser } from "../services/auth.service.js";
import User from "../models/User.js";

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

export const getAllUsers = asyncHandler(async (req, res) => {
  const { search, isVerified, sortBy = "createdAt", sortOrder = "desc" } = req.query;

  // Build query to get only users (not admins)
  const query = { role: "user" };

  // Add search filter if provided
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  // Add verification filter if provided
  if (isVerified !== undefined && isVerified !== "") {
    query.isVerified = isVerified === "true";
  }

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === "asc" ? 1 : -1;

  // Execute query
  const users = await User.find(query)
    .select("-password -refreshToken")
    .sort(sort);

  // Get statistics
  const totalUsers = await User.countDocuments({ role: "user" });
  const verifiedUsers = await User.countDocuments({ role: "user", isVerified: true });
  const unverifiedUsers = await User.countDocuments({ role: "user", isVerified: false });

  return res.status(200).json({
    success: true,
    count: users.length,
    total: totalUsers,
    verified: verifiedUsers,
    unverified: unverifiedUsers,
    users,
  });
});

export const updateUserVerification = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { isVerified } = req.body;

  // Validate input
  if (typeof isVerified !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "isVerified must be a boolean value",
    });
  }

  // Find and update user
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Don't allow changing admin verification status
  if (user.role === "admin") {
    return res.status(403).json({
      success: false,
      message: "Cannot modify admin verification status",
    });
  }

  // Update verification status
  user.isVerified = isVerified;
  await user.save();

  return res.status(200).json({
    success: true,
    message: `User ${isVerified ? "verified" : "unverified"} successfully`,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      isVerified: user.isVerified,
    },
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Find user
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Don't allow deleting admins
  if (user.role === "admin") {
    return res.status(403).json({
      success: false,
      message: "Cannot delete admin users",
    });
  }

  // Delete user
  await User.findByIdAndDelete(userId);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
