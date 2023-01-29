import express from 'express';
import { getAllClothes } from '../../controllers/category/clothes.js';

const router = express.Router();
router.get('/clothes', getAllClothes);

export default router;