import express from "express";
import { login, register, uploadImage} from "../controller/authController.js";
import { parser } from "../config.js";

const router = express.Router();

router.post("/upload", parser.single("image"), uploadImage);
router.post("/register", parser.single("image"), register);
router.post("/login", login);

export default router;