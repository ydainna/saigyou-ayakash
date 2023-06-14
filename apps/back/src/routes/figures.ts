import { Request, Server } from "@hapi/hapi";
import { FigureController } from "../database/controllers/FigureController";

export const initFiguresRoutes = async (server: Server) => {
  //get all figures
  server.route({
    method: "GET",
    path: "/figures",
    options: {
      auth: false,
    },
    handler: async (_request: Request) => {
      const figures = await FigureController.findAll({ _id: 0, __v: 0 });
      figures.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return figures;
    },
  });

  //get all stats
  server.route({
    method: "GET",
    path: "/stats",
    options: {
      auth: false,
    },
    handler: async (_request: Request) => {
      return FigureController.getStats();
    },
  });
};
