import express from "express";

import { validate } from "../middleware/validate.middleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

import { contentValidator } from "../validators/content.validator.js";

import {
  addContent,
  getContents,
} from "../controllers/adminContent.controller.js";

const router = express.Router();

router.post(
  "/addContent",
  verifyJWT,
  verifyAdmin,
  validate(contentValidator),
  addContent
);

router.get(
  "/getContents",
  verifyJWT,
  verifyAdmin,
  getContents
);

export default router;