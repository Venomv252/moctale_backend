export const verifyAdmin = (req, res, next) => {
  console.log("\n========== VERIFY ADMIN ==========");
  console.log("req.user:", req.user);
  console.log("Role:", req.user?.role);

  if (!req.user) {
    console.log("No user attached");

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "admin") {
    console.log("User is not admin");

    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  console.log("✅ Admin Verification Passed");
  console.log("==================================\n");

  next();
};