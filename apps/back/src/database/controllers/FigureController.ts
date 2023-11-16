import { v4 as uuidv4 } from "uuid";
import FigureModel from "../models/FigureModel";
import { DateTime } from "luxon";

// Figure controller
export namespace FigureController {
  // Create a new figure
  // sql: INSERT INTO figures (uuid, img, name, origin, maker, version, price, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  export async function create(img: string, name: string, origin: string, maker: string, version: string, price: number) {
    // Create a new figure
    const figure = new FigureModel({
      uuid: uuidv4(),
      img,
      name,
      origin,
      maker,
      version,
      price,
      date: DateTime.local().toJSDate(),
    });
    // Save the figure
    await figure.save();
  }

  // Get all figures
  // sql: SELECT * FROM figures
  export async function findAll(ignore?: Object) {
    return FigureModel.find({}, ignore);
  }

  // Get stats
  // sql: SELECT COUNT(*) AS totalCount, SUM(price) AS totalPrice, MAX(date) AS lastDate FROM figures
  export async function getStats() {
    // Get the total count of figures
    const totalCount = await FigureModel.countDocuments();
    // Get the total price of figures
    const totalPrice = await FigureModel.aggregate([
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$price" },
        },
      },
    ]);
    // Get the last date of a figure
    const lastDate = await FigureModel.aggregate([
      {
        $group: {
          _id: null,
          lastDate: { $max: "$date" },
        },
      },
    ]);

    // Return the stats
    return {
      totalCount: totalCount,
      totalPrice: totalPrice[0].totalPrice,
      lastDate: lastDate[0].lastDate,
    };
  }

  // Delete a figure
  // sql: DELETE FROM figures WHERE uuid = ?
  export async function deleteFigure(uuid: string) {
    return FigureModel.findOneAndDelete({ uuid });
  }

  // Get a figure
  // sql: SELECT * FROM figures WHERE uuid = ?
  export async function getFigure(uuid: string) {
    return FigureModel.findOne({ uuid });
  }

  // Update a figure
  // sql: UPDATE figures SET name = ?, origin = ?, maker = ?, version = ?, price = ? WHERE uuid = ?
  export async function updateFigure(uuid: string, name: string, origin: string, maker: string, version: string, price: number) {
    // Return the updated figure
    return FigureModel.findOneAndUpdate(
      { uuid },
      {
        $set: {
          name,
          origin,
          maker,
          version,
          price,
        },
      },
      { new: true }
    );
  }
}
