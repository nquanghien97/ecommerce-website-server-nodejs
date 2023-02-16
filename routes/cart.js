import express from 'express';
import { addCart, getCart, updateCart, deleteCart } from '../controllers/cart.js';

const router = express.Router();
router.post('/cart', addCart);
router.post('/getcart', getCart);
router.post('/cart/updatecart', updateCart);
router.post('/cart/deletecart', deleteCart);

export default router;