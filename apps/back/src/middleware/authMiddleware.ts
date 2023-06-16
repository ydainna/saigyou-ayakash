import { Request, Server, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";

export const authMiddleware = async (server: Server) => {
  server.ext("onPreHandler", (request: Request, h: ResponseToolkit) => {
    if (request.method === "options") {
      return h.continue;
    }

    //check ttl cookie
    try {
      const cookie = request.state.session;
      if (cookie) {
        const ttl = cookie.ttl;
        if (ttl < Date.now()) {
          throw Boom.unauthorized("Votre session a expiré.");
        }
      }
    } catch (error) {
      throw Boom.unauthorized("Votre session a expiré.");
    }

    return h.continue;
  });
};
