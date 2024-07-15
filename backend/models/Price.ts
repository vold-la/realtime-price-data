import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
},{
    timestamps: true
})

export default mongoose.model('prices',PriceSchema)
