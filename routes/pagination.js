import express from 'express';
import { paginationProduct } from '../controllers/pagination.js';

const router = express.Router();

router.post('/page/', paginationProduct);

export default router;