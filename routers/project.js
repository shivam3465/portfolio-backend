import express from "express";
import { addProject, allProject, deleteProject } from "../controllers/project.js";
import { authenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/project/all").get( allProject);
router.route("/project/add").post(authenticated, addProject);
router.route("/project/delete/:id").delete(authenticated, deleteProject);

export default router;
