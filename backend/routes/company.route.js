import express from "express"
import isauthenticated from "../middlewares/isauthenticated.js";
import { getcompany, getcompanybyId, registercompany, updatecompany } from "../controllers/company.controller.js";

const router = express.Router();

router.route("/register").post(isauthenticated,registercompany);
router.route("/get").get(isauthenticated,getcompany);
router.route("/get/:id").get(isauthenticated,getcompanybyId);
router.route("/update/:id").put(isauthenticated,updatecompany);

export default router;  
