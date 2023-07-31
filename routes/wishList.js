import express from 'express';
import { addWishList, getWishList } from '../controllers/wishList.js';
import auth from '../middleware/auth.js';

const router = express.Router();
router.post('/wishlist', auth, addWishList);
router.post('/getwishlist', auth, getWishList);

export default router;