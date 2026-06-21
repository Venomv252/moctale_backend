import express from "express";

import {
  adminLogin,
  adminLogout,
  getAdminProfile,
} from "../controllers/admin.controller.js";

import {verifyJWT} from "../middleware/verifyJWT.js";
import {verifyAdmin} from "../middleware/verifyAdmin.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema } from "../validators/auth.validator.js";

const router = express.Router();

// public route
router.post("/login", validate(loginSchema), adminLogin);

// protected admin routes
router.use(verifyJWT, verifyAdmin);

router.post("/logout", adminLogout);

router.get("/me", getAdminProfile);

export default router;
