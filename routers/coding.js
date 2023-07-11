import express from "express";
import { addCodingProfile, allCodingProfiles, deleteCodingsProfile } from "../controllers/coding.js";
import { authenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/coding/all").get( allCodingProfiles);
router.route("/coding/add").post(authenticated, addCodingProfile);
router.route("/coding/delete/:id").delete(authenticated, deleteCodingsProfile);

export default router;
