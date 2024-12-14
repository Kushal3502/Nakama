import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/User.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/auth").post(loginUser);
router.route("/logout").post(authMiddleware, logoutUser);

export default router;
