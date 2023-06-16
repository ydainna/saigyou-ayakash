import { Request, Server, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";

export const adminMiddleware = async (server: Server) => {
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
          throw Boom.unauthorized("Your session has expired");
        }
      }
    } catch (error) {
      throw Boom.unauthorized("Your session has expired");
    }

    return h.continue;
  });
};
