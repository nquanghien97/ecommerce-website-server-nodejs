import express from 'express';
import { getFemaleProducts } from '../../../controllers/filter/gender/female.js';

const router = express.Router();
router.get('/female', getFemaleProducts);

export default router;