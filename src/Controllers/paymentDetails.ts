import { Request, Response } from 'express';
import mpesaSchema from '../Models/index.ts';

export const getPaymentDetails = async (req: Request, res: Response) => {
    try {
        const paymentDetails = await mpesaSchema.find();
        res.status(200).json(paymentDetails);
    } catch (error) {
        console.error('Error fetching payment details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}