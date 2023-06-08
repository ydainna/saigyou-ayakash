import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { getLogger } from "./utils/getLogger";
import { Database } from "./database/mongo";
import * as Sentry from "@sentry/node";
//routes
import { initFiguresRoutes } from "./routes/figures";
import { initLoginRoutes } from "./routes/login";
import { initWishlistRoutes } from "./routes/wishlist";
import { initPictureRoutes } from "./routes/picture";
//middleware
import { adminMiddleware } from "./middleware/adminMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";

export let server: Server;

// Init the server
export const init = async (): Promise<Server> => {
  // Create a server with a host and port and CORS enabled
  server = Hapi.server({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    routes: {
      cors: {
        origin: process.env.NODE_ENV === "dev" ? ["*"] : ["https://saigyou-ayakash.com"],
        additionalHeaders: ["X-Public-Request", "Content-Type", "Origin", "Authorization", "Cache-Control"],
      },
    },
  });

  // Register plugins
  await server.register(require("@hapi/inert"));

  // register routes
  await initFiguresRoutes(server);
  await initLoginRoutes(server);
  await initWishlistRoutes(server);
  await initPictureRoutes(server);

  // Register middleware
  await adminMiddleware(server);
  await errorMiddleware(server);

  // Connect to database
  await Database.connect();

  Sentry.init({
    dsn: "https://cebb6018536749e08fbaa19b0e501208@o4504728954470400.ingest.sentry.io/4504730904625152",

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  return server;
};

// Start the server
export const start = async (): Promise<void> => {
  const log = getLogger("Server");
  log.info(`Listening on ${server.settings.host}:${server.settings.port}`);
  return server.start();
};

// Stop the server
process.on("unhandledRejection", (err) => {
  const log = getLogger("unhandledRejection");
  log.error(err);
  process.exit(1);
});
