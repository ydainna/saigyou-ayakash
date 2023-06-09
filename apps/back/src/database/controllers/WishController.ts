import { v4 as uuidv4 } from "uuid";
import WishModel from "../models/WishModel";
import { DateTime } from "luxon";

// Wish controller
export namespace WishlistController {
  // Create a new wish
  // sql: INSERT INTO wishes (uuid, img, name, origin, maker, version, price, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  export async function create(link: string, name: string, origin: string, maker: string, version: string, price: number) {
    // Create a new wish
    const wish = new WishModel({
      uuid: uuidv4(),
      link,
      name,
      origin,
      maker,
      version,
      price,
      date: DateTime.local().toJSDate(),
    });
    // Save the wish
    await wish.save();
  }

  // Get all wishes
  // sql: SELECT * FROM wishes
  export async function findAll() {
    // Return all wishes
    return WishModel.find();
  }

  // Delete a wish
  // sql: DELETE FROM wishes WHERE uuid = ?
  export async function deleteWish(uuid: string) {
    // Delete the wish
    await WishModel.deleteOne({ uuid });
  }
}
