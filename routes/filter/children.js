import express from 'express';
import { getChildrenProducts } from '../../controllers/filter/children.js';

const router = express.Router();
router.get('/children', getChildrenProducts);

export default router;