import mongoose from "mongoose";
import { getLogger } from "../utils/getLogger";

export namespace Database {
  export async function connect(): Promise<void> {
    const log = getLogger("Database");
    mongoose.connection.on("connecting", () => {
      log.info("Connecting...");
    });

    mongoose.connection.on("reconnecting", () => {
      log.warn("Reconnecting...");
    });

    mongoose.connection.on("connected", () => {
      log.info("Connected!");
    });

    mongoose.connection.on("reconnected", () => {
      log.info("Reconnected!");
    });

    mongoose.connection.on("disconnected", () => {
      log.error("Disconnected!");
    });

    await mongoose.connect(process.env.MONGODB_URL as string);
  }
}
