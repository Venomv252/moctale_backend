import express from "express";
import { validate} from "../middleware/validate.middleware.js";
import {usernameSchema} from "../validators/username.check.validator.js"
import {checkusername} from "../controllers/check.username.js"

const router = express.Router();
router.get("/username/:username",validate(usernameSchema),checkusername);

export default router;
