import express from "express";
import { addAbout, addDesc, addProfile, getUserDetails, login, logout ,contactMe} from "../controllers/user.js";
import { authenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/user/me").get(getUserDetails);

router.route("/user/add/desc").post(authenticated, addDesc);
router.route("/user/add/about").post(authenticated, addAbout);
router.route("/user/add/about/profile").post(authenticated, addProfile);

router.route("/contact").post(contactMe);

export default router;