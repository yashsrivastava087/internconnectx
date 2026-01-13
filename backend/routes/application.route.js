import express from "express"
import isauthenticated from "../middlewares/isauthenticated.js";
import { applyjob, getapplicants, getAppliedjob, updatestatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isauthenticated, applyjob);
router.route("/get").get(isauthenticated, getAppliedjob);
router.route("/:id/applicants").get(isauthenticated, getapplicants);
router.route("/status/:id/update").post(isauthenticated, updatestatus);

export default router;
