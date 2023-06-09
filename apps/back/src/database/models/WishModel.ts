import { Document, model, Schema } from "mongoose";
import { IWish } from "@saigyou-ayakash/types";

// Wish schema
const WishSchema = new Schema<IWish & Document>({
  uuid: { type: String, required: true },
  link: { type: String, required: true },
  name: { type: String, required: true },
  origin: { type: String, required: true },
  maker: { type: String, required: true },
  version: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
});

// Wish model
const WishModel = model<IWish & Document>("Wish", WishSchema);

export default WishModel;
export { IWish };
