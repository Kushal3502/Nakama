import { Router } from "express";
import {
  currentUser,
  generateNewAccessToken,
  getAllLikes,
  like,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/User.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(authMiddleware, generateNewAccessToken);
router.route("/me").get(authMiddleware, currentUser);
router.route("/like/:anime").post(authMiddleware, like);
router.route("/likes").get(authMiddleware, getAllLikes);
router.route("/logout").post(authMiddleware, logoutUser);

export default router;
