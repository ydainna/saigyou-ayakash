import { Document, model, Schema } from "mongoose";

// Interface for the Wish model (type of the document)
interface IWish {
  uuid: string;
  link: string;
  name: string;
  origin: string;
  maker: string;
  version: string;
  price: number;
  date: string;
}

// Wish schema
const WishSchema = new Schema<IWish & Document>({
  uuid: { type: String, required: true },
  link: { type: String, required: true },
  name: { type: String, required: true },
  origin: { type: String, required: true },
  maker: { type: String, required: true },
  version: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: String, required: true },
});

// Wish model
const WishModel = model<IWish & Document>("Wish", WishSchema);

export default WishModel;
export { IWish };
