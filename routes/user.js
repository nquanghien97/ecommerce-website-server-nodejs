import express from 'express';
import { getUser, updateUser } from '../controllers/user.js';
import upload from '../utils/multer.js';
import auth from '../middleware/auth.js';

const router = express.Router();
router.post('/user', auth, getUser);
router.patch('/user', auth, upload.single('image'), updateUser)

export default router;