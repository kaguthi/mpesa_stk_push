import axios from 'axios';
import { Response } from 'express';
import { timestamp } from "../utils/timeStamp.ts";
import { RequestExtended } from "../Middlewares/index.ts";

export const handleSTKPush = async (req: RequestExtended, res: Response): Promise<void> => {
    const { phone, amount } = req.body;
    if (!phone || !amount) {
        res.status(400).json({
            message: "Phone number and amount are required.",
        });
    }

    const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    const token = req.token;
    const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');
    const auth = `Bearer ${token}`;

    const payload = {
        "BusinessShortCode": process.env.MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": process.env.MPESA_SHORTCODE,
        "PhoneNumber": phone,
        "CallBackURL": process.env.CALLBACK_URL,
        "AccountReference": "E-buy Store",
        "TransactionDesc": "Payment for goods purchased"
    };

    try {
        const response = await axios.post(url, payload, {
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            }
        });
        res.status(201).json({
            message: "Request sent successfully.",
            data: response.data,
            status: "success"
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("STK Push Error:", error.response?.data || error.message);
        res.status(500).json({
            message: "An error occurred while processing the request.",
            error: error.response?.data || error.message,
            status: "error"
        });
    }
};