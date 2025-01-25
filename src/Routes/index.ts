import express from 'express';
import { handleSTKPush } from '../Controllers/index';
import { generateToken } from '../Middlewares/index';

const router = express.Router();

router.post('/stk-push',generateToken, handleSTKPush);
export default router;