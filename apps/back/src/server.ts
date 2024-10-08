import Hapi from "@hapi/hapi";
import CookiePlugin from "@hapi/cookie";
import { Server } from "@hapi/hapi";
//utils
import { getLogger } from "./utils/getLogger";
//db
import { Database } from "./database/mongo";
import { UserController } from "./database/controllers/UserController";
//public routes
import { initFiguresRoutes } from "./routes/public/figures";
import { initLoginRoutes } from "./routes/public/login";
import { initWishlistRoutes } from "./routes/public/wishlist";
import { initPictureRoutes } from "./routes/public/picture";
//admin routes
import { initAdminFiguresRoutes } from "./routes/admin/AdminFigures";
import { initAdminWishlistRoutes } from "./routes/admin/AdminWishlist";
//middleware
import { errorMiddleware } from "./middleware/errorMiddleware";
import { initApi } from "./routes/public/home";

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

  await initApi(server);

  // Register public routes
  await initLoginRoutes(server);
  await initFiguresRoutes(server);
  await initWishlistRoutes(server);
  await initPictureRoutes(server);

  // Register auth strategy
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "session",
      password: process.env.COOKIE_SECRET,
      isSecure: process.env.NODE_ENV !== "dev",
      isHttpOnly: true,
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

  // Set default auth strategy
  server.auth.default("session");

  // register admin routes
  await initAdminFiguresRoutes(server);
  await initAdminWishlistRoutes(server);

  // Register middleware
  await errorMiddleware(server);

  // Connect to database
  await Database.connect();

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
