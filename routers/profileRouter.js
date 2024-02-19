import express from 'express';
//import multer from 'multer';
import {  getUserProfileImage,  updateProfileImage, deleteProfileImage } from '../controllers/profileController.js';

const router = express.Router();
//const upload = multer(); // Add your specific configuration

// Profile routes
router.get('/profile-image/:filename', getUserProfileImage);
router.post('/update-image/:userid', updateProfileImage);
router.post('/delete-image/:userid', deleteProfileImage);


export default router;
