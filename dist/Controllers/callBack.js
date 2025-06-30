import mpesaSchema from '../Models/index.js';
export const callBack = async (req, res) => {
    try {
        const stkCallback = req.body?.Body?.stkCallback;
        if (!stkCallback) {
            res.status(400).json({ message: "Invalid data" });
        }
        const resultCode = stkCallback.ResultCode;
        if (resultCode !== 0) {
            console.error('STK Push failed:', req.body.Body.stkCallback.ResultDesc);
            res.status(400).send('STK Push failed.');
        }
        const data = stkCallback.CallbackMetadata?.Item;
        if (!data || data.length < 5) {
            res.status(400).json({ message: "Invalid data" });
        }
        const mpesaDetails = {
            Amount: data[0]?.value ?? 0,
            MpesaReceiptNumber: data[1]?.Value ?? 'N/A',
            TransactionDate: data[3]?.Value ?? 'Unknown',
            PhoneNumber: data[4]?.Value ?? 'Unknown',
        };
        const mpesa = await mpesaSchema.create(mpesaDetails);
        res.status(200).json({ message: 'Callback received successfully.', data: mpesa });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
