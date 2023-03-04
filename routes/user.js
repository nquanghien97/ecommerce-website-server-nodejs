import express from 'express';
import { getUser, updateUser } from '../controllers/user.js';
import upload from '../utils/multer.js';

const router = express.Router();
router.post('/user', getUser);
router.patch('/user', upload.single('image'), updateUser)

export default router;