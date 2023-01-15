import express from 'express';
import { createClothes, getAllClothes, getClothes, updateClothes, deleteClothes } from '../controllers/clothes.js';

const router = express.Router();
router.post('/clothes', createClothes);
router.get('/clothes', getAllClothes);
router.get('/clothes/:clothesId', getClothes);
router.patch('/clothes/:clothesId', updateClothes);
router.delete('/clothes/:clothesId', deleteClothes);

export default router;