import express from 'express';
import { uploadImages, getMemberImage,  getAllUploadedImages, getAllImages, approveUpload, denyUpload,  getSearchedImages, singleImage, updateLikes } from "../controllers/imageController.js";

const router = express.Router();

router.get("/alluploadedimages/:status", getAllUploadedImages); 
// router.get("/alluploadedimages/:selectedCategory", getAllCategoryImages)
router.post("/upload", uploadImages); 
router.post("/updatelikes", updateLikes);
router.get("/allimages/:filename", getAllImages);
router.get("/members/:filename", getMemberImage); 
router.patch("/approve/:id", approveUpload);
router.delete("/deny/:id", denyUpload)
router.get("/alluploadedimages/approved/:tag", getSearchedImages); 
router.get("/singleimage/:filename", singleImage); 


export default router;
