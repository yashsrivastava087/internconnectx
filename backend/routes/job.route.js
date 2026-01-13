import express from "express"
import isauthenticated from "../middlewares/isauthenticated.js";
import { getadminjobs, getAlljobs, getJobById, postjob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isauthenticated, postjob);
router.route("/get").get(isauthenticated, getAlljobs);
router.route("/get/:id").get(isauthenticated, getJobById);
router.route("/getadminjobs").get(isauthenticated, getadminjobs);

export default router;
