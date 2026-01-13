import express from "express"
import isauthenticated from "../middlewares/isauthenticated.js";import {
  getadminjobs,
  getAlljobs,
  getJobById,
  postjob,
  deleteJob 
} from "../controllers/job.controller.js";



const router = express.Router();

router.route("/post").post(isauthenticated, postjob);
router.route("/get").get(getAlljobs);
router.route("/get/:id").get(getJobById);
router.route("/getadminjobs").get(isauthenticated, getadminjobs);
router.route("/delete/:id").delete(isauthenticated, deleteJob);

export default router;
