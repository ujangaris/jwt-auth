import express from 'express';
import { getUsers, Login, Register } from '../controllers/Users.js';
import { verifyToken } from '../middleware/VerifyToken.js';
const router = express.Router();
// endpoint users  hanya dapat diakses oleh user yang memiliki token access(tidak login)
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);

export default router;
