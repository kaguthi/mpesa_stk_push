import express from 'express';
import { handleSTKPush } from '../Controllers/index.ts';
import { generateToken } from '../Middlewares/index.ts';
import { callBack } from '../Controllers/callBack.ts';
import { getPaymentDetails } from '../Controllers/paymentDetails.ts'
import { createTodo, getTodos } from '../Controllers/todo.ts';

const router = express.Router();

router.post('/stk-push',generateToken, handleSTKPush);
router.post('/callback', callBack);
router.get('/payment', getPaymentDetails);
router.post('/todo', createTodo);
router.get('/todo', getTodos);

export default router;