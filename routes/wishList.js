import express from 'express';
import { addWishList, getWishList } from '../controllers/wishList.js';
// import verifyToken from '../middleware/auth.js';

const router = express.Router();
router.post('/wishlist', addWishList);
router.post('/getwishlist', getWishList);

export default router;