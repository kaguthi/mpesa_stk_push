import mongoose from "mongoose";

const mpesaSchema = new mongoose.Schema({
    Amount: {
        type: Number,
        required: true,
    },
    MpesaReceiptNumber: {
        type: String,
        required: true,
    },
    TransactionDate: {
        type: Date,
        required: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
    }
});

export default mongoose.model("Mpesa", mpesaSchema);