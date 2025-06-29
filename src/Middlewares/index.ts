import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

export type RequestExtended = Request & { token?: string };

export const generateToken = async (req: RequestExtended, res: Response, next: NextFunction) => {
    const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY as string;
    const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET as string;
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Basic ${auth}`,
            }
            
        })
        req.token = response.data.access_token;    
        next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error.message);
    }};