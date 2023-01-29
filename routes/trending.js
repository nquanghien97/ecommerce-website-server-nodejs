import express from 'express';
import { createTrending, getAllTrending, getTrending, updateTrending, deleteTrending } from '../controllers/trending.js';

const router = express.Router();
router.post('/trending', createTrending);
router.get('/trending', getAllTrending);
router.get('/trending/:trendingId', getTrending);
router.patch('/trending/:trendingId', updateTrending);
router.delete('/trending/:trendingId', deleteTrending);

export default router;