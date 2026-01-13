import express from "express"
import { logout, login, register, updateprofile } from "../controllers/user.controller.js";
import isauthenticated from "../middlewares/isauthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/updateprofile").post(isauthenticated,singleUpload,updateprofile);

export default router;
