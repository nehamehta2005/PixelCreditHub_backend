import { Router } from "express";
 import {contactUs} from "../controllers/contactUsController.js";


const router = Router();

router.post("/contactUs", contactUs);



export default router;
