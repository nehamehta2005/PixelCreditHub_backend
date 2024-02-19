import { Router } from "express";
 import {members, singleMember } from "../controllers/memberControllers.js";


const router = Router();

router.get("/", members);


router.get("/:singlemember", singleMember);


export default router;