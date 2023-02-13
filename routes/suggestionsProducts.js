import express from 'express';
import { suggestionsProducts } from '../controllers/suggestionsProducts.js';

const router = express.Router();

router.get('/suggestions/', suggestionsProducts);

export default router;