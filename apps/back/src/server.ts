import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { getLogger } from "./utils/getLogger";
import { Database } from "./database/mongo";
import * as Sentry from "@sentry/node";
import CookiePlugin from "@hapi/cookie";
import { UserController } from "./database/controllers/UserController";
//routes
import { initFiguresRoutes } from "./routes/figures";
import { initLoginRoutes } from "./routes/login";
import { initWishlistRoutes } from "./routes/wishlist";
import { initPictureRoutes } from "./routes/picture";
import { initAdminFiguresRoutes } from "./routes/admin/AdminFigures";
import { initAdminWishlistRoutes } from "./routes/admin/AdminWishlist";
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
        credentials: true,
      },
    },
  });

  // Register plugins
  await server.register(require("@hapi/inert"));
  await server.register(CookiePlugin);

  await initLoginRoutes(server);
  await initFiguresRoutes(server);
  await initWishlistRoutes(server);
  await initPictureRoutes(server);

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "session",
      password: process.env.COOKIE_SECRET,
      isSecure: true,
      isHttpOnly: false,
      path: "/",
      ttl: 1000 * 60 * 60 * 24 * 7, // 1 week
      clearInvalid: true,
      strictHeader: true,
    },
    validate: async (request: any, session: any) => {
      const account = await UserController.findById(session.id);

      if (!account) {
        return { isValid: false };
      }

      if (session.scope !== account.scope) {
        return { isValid: false };
      }

      return { isValid: true, credentials: account };
    },
  });

  server.auth.default("session");

  // register routes
  await initAdminFiguresRoutes(server);
  await initAdminWishlistRoutes(server);

  // Register middleware
  //await adminMiddleware(server);
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
