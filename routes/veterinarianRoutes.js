import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
  profile,
  register,
  confirm,
  authUser,
  forgottenPassword,
  checkPToken,
  newPassword,
  firebaseAuth
} from "../controllers/veterinarianController.js";

const router = express.Router();

//access without session
router.post("/", register);
router.get("/confirm/:token", confirm);
router.post("/login", authUser);
router.post("/firebase-login", firebaseAuth);
router.post("/forgotten-password", forgottenPassword);

router.route("/password-change/:token").get(checkPToken).post(newPassword);

//session needed
router.get("/profile", checkAuth, profile);

export default router;
