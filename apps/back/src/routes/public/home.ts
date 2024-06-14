import { Request, Server } from "@hapi/hapi";

export const initApi = async (server: Server) => {
  server.route({
    method: "GET",
    path: "/",
    options: {
      auth: false,
    },
    handler: async (_request: Request) => {
      return { message: "Hello from the home page" };
    },
  });
};
