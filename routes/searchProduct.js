import express from 'express';
import { searchProducts } from '../controllers/searchProducts.js';

const router = express.Router();

router.get('/search/', searchProducts);

export default router;