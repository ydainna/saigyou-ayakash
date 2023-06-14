import { Request, Server } from "@hapi/hapi";
import { WishlistController } from "../database/controllers/WishController";

export const initWishlistRoutes = async (server: Server) => {
  //get all wishes
  server.route({
    method: "GET",
    path: "/wishlist",
    options: {
      auth: false,
    },
    handler: async (_request: Request) => {
      return WishlistController.findAll();
    },
  });
};
