import express from 'express';
import { getAllShoes } from '../../controllers/category/shoes.js';

const router = express.Router();
router.get('/shoes', getAllShoes);

export default router;