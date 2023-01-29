import express from 'express';
import { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from '../controllers/products.js';

const router = express.Router();
router.post('/product', createProduct);
router.get('/product', getAllProducts);
router.get('/product/:productId', getProduct);
router.patch('/product/:productId', updateProduct);
router.delete('/product/:productId', deleteProduct);

export default router;