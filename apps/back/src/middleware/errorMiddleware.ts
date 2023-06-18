import { Request, Server, ResponseToolkit } from "@hapi/hapi";
import { getLogger } from "../utils/getLogger";

export const errorMiddleware = async (server: Server) => {
  server.ext("onPreResponse", (request: Request, h: ResponseToolkit) => {
    const response = request.response;
    // @ts-expect-error - Hapi types are wrong
    if (response.isBoom) {
      const log = getLogger("Boom");
      log.error(response);
    }

    return h.continue;
  });
};
