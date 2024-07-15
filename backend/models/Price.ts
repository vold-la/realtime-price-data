import mongoose, { Document, Schema } from 'mongoose';

export interface IPrice extends Document {
  symbol: string;
  price: number;
  timestamp: Date;
}

const PriceSchema: Schema = new Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IPrice>('Price', PriceSchema);