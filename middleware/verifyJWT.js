import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyJWT = async (req, res, next) => {
  try {
    console.log("\n========== VERIFY JWT ==========");
    console.log("Headers:", req.headers);

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Access token missing");

      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded Payload:", decoded);

    const user = await User.findById(decoded.id)
      .select("-password");

    console.log("User Found:", user);

    if (!user) {
      console.log("User not found");

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.user = user;

    console.log("✅ JWT Verification Passed");
    console.log("===============================\n");

    next();
  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};