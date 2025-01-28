import express from 'express';
import { handleSTKPush } from '../Controllers/index';
import { generateToken } from '../Middlewares/index';
import { callBack } from '../Controllers/callBack';

const router = express.Router();

router.post('/stk-push',generateToken, handleSTKPush);
router.post('/callback', callBack);
export default router;