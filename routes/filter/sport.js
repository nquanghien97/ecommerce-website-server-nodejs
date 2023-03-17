import express from 'express';
import { getSportProducts } from '../../controllers/filter/sport.js';

const router = express.Router();
router.get('/sport', getSportProducts);

export default router;