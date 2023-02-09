import express from 'express';
import { addCart } from '../controllers/cart.js';

const router = express.Router();
router.post('/cart', addCart);
// router.get('/cart', addCart);

export default router;