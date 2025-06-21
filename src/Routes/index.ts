import express from 'express';
import { handleSTKPush } from '../Controllers/index.ts';
import { generateToken } from '../Middlewares/index.ts';
import { callBack } from '../Controllers/callBack.ts';
import { getPaymentDetails } from '../Controllers/paymentDetails.ts'

const router = express.Router();

router.post('/stk-push',generateToken, handleSTKPush);
router.post('/callback', callBack);
router.get('/payment', getPaymentDetails);

export default router;