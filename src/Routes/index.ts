import express from 'express';
import { handleSTKPush } from '../Controllers/index';
import { generateToken } from '../Middlewares/index';
import { callBack } from '../Controllers/callBack';
import { getPaymentDetails } from '../Controllers/paymentDetails'
import { createTodo, getTodos } from '../Controllers/todo';

const router = express.Router();

router.post('/stk-push',generateToken, handleSTKPush);
router.post('/callback', callBack);
router.get('/payment', getPaymentDetails);
router.post('/todo', createTodo);
router.get('/todo', getTodos);

export default router;