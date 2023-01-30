import express from 'express';
import { getMaleProducts } from '../../../controllers/filter/gender/male.js';

const router = express.Router();
router.get('/male', getMaleProducts);

export default router;