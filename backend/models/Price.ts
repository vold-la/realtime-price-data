import mongoose, { Document, Schema, Model } from 'mongoose';

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


export interface IPriceModel extends Model<IPrice> {}

export const Price: IPriceModel =
  mongoose.models.Price || mongoose.model<IPrice>('Price', PriceSchema);

export default Price;
