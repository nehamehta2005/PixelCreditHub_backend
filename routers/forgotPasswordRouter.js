import { Router } from "express";
 import {forgotPassword} from "../controllers/forgotPasswordController.js";
 import{compareSEcurityAnswer} from "../controllers/forgotPasswordController.js"
 import {resetPassword} from "../controllers/forgotPasswordController.js"


const router = Router();

router.post("/", forgotPassword);
router.post("/compareSecurityAnswer", compareSEcurityAnswer);
router.post("/resetPassword/:userId" , resetPassword);


export default router;
