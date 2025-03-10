import express from 'express';
import { adminSignupController } from '../controllers/adminSignupController';
import { adminLoginController } from '../controllers/adminLoginController';

const router = express.Router();

router.post('/signup', adminSignupController);
router.post('/login', adminLoginController);

export default router;
