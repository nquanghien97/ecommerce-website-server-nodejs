import express from 'express';
import { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from '../controllers/products.js';
import upload from '../utils/multer.js';

const router = express.Router();
router.post('/product', upload.single("image"), createProduct);
router.get('/product', getAllProducts);
router.get('/product/:productId', getProduct);
router.patch('/product/:productId', upload.single('image'), updateProduct);
router.delete('/product/:productId', deleteProduct);

export default router;