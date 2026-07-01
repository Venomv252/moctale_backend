import express from "express";
import { validate1} from "../middleware/validate.middleware.js";
import {usernameSchema} from "../validators/username.check.validator.js"
import {checkusername} from "../controllers/check.username.js"

const router = express.Router();
router.get("/username/:username",validate1(usernameSchema),checkusername);

export default router;
