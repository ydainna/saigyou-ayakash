import { Document, model, Schema } from "mongoose";
import { IFigure } from "@saigyou-ayakash/types";

// Figure schema
const FigureSchema = new Schema<IFigure & Document>({
  uuid: { type: String, required: true },
  img: { type: String, required: true },
  name: { type: String, required: true },
  origin: { type: String, required: true },
  maker: { type: String, required: true },
  version: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
});

// Figure model
const FigureModel = model<IFigure & Document>("Figure", FigureSchema);

export default FigureModel;
export { IFigure };
