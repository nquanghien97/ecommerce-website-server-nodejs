import express from 'express';
import { addCart, getCart, updateCart, deleteCart } from '../controllers/cart.js';
import auth from '../middleware/auth.js';

const router = express.Router();
router.post('/cart', auth, addCart);
router.get('/getcart', auth, getCart);
router.post('/cart/updatecart', auth, updateCart);
router.post('/cart/deletecart', auth, deleteCart);

export default router;