import {Request, Response} from 'express';
import mpesaSchema from '../Models/index';

export const callBack = async (req: Request, res: Response): Promise<void> => {
    const result_code = req.body.Body.stkCallback.ResultCode;
    if (result_code !== 0) {
        console.error('STK Push failed:', req.body.Body.stkCallback.ResultDesc);
        res.status(400).send('STK Push failed.');
    } else {
        const data = req.body.Body.stkCallback.CallbackMetadata.Item;
        const mpesaDetails ={
            Amount: data[0].Value,
            MpesaReceiptNumber: data[1].Value,
            TransactionDate: data[3].Value,
            PhoneNumber: data[4].Value
        }
        const mpesa = await mpesaSchema.create(mpesaDetails);
        res.status(200).json({ message: 'Callback received successfully.', data });
    }
};