import { init, start } from "./server";
import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Init and start API server
init().then(() => start());
