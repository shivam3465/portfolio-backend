import express from "express";
import { addSkill, allSkills, deleteSkill } from "../controllers/skills.js";
import { authenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/skill/all").get( allSkills);
router.route("/skill/add").post(authenticated, addSkill);
router.route("/skill/delete/:id").delete(authenticated, deleteSkill);

export default router;
