import express from 'express';
import { handleImageApproval } from '../controllers/adminController.js';

const router = express.Router();

router.post('/approve-image', handleImageApproval);

export default router;
