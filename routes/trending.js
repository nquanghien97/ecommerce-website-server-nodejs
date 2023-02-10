import express from 'express';
import { createTrending, getAllTrending, getTrending, updateTrending, deleteTrending } from '../controllers/trending.js';
import upload from '../utils/multer.js';

const router = express.Router();
router.post('/trending',upload.single("image"), createTrending);
router.get('/trending', getAllTrending);
router.get('/trending/:trendingId', getTrending);
router.patch('/trending/:trendingId',upload.single("image"), updateTrending);
router.delete('/trending/:trendingId', deleteTrending);

export default router;