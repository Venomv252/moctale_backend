import express from "express";
import {checkPhone} from "../controllers/check.Phone.js"
import {validate} from "../middleware/validate.middleware.js"
import {phoneSchema} from "../validators/phone.check.validator.js";

const router = express.Router();


router.get("/checkPhone/:phone",validate(phoneSchema),checkPhone);

export default router;
