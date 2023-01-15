import express from 'express';
import { createShoes, getAllShoes, getShoes, updateShoes, deleteShoes } from '../controllers/shoes.js';

const router = express.Router();
router.post('/shoes', createShoes);
router.get('/shoes', getAllShoes);
router.get('/shoes/:shoesId', getShoes);
router.patch('/shoes/:shoesId', updateShoes);
router.delete('/shoes/:shoesId', deleteShoes);

export default router;