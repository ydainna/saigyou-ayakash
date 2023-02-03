import { Request, Server, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";

export const adminMiddleware = async (server: Server) => {
  server.ext("onRequest", async (req: Request, h: ResponseToolkit) => {
    // Ignore CORS initial request
    if (req.method === "options") {
      return h.continue;
    }

    // Verify jwt on every path that start with /admin and isn't login
    if (req.path.startsWith("/admin") && req.path !== "/admin/login") {
      try {
        const authHeader: string = req.headers["authorization"];
        jwt.verify(authHeader.substring(7, authHeader.length), process.env.JWT_SECRET as string);
        return h.continue;
      } catch (err) {
        throw Boom.unauthorized();
      }
    }

    return h.continue;
  });
};
