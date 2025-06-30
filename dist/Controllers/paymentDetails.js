import mpesaSchema from '../Models/index.js';
export const getPaymentDetails = async (req, res) => {
    try {
        const paymentDetails = await mpesaSchema.find();
        res.status(200).json(paymentDetails);
    }
    catch (error) {
        console.error('Error fetching payment details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
