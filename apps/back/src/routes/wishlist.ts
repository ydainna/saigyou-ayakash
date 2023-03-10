import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import Boom from "@hapi/boom";
import { WishlistController } from "../database/controllers/WishController";

export const initWishlistRoutes = async (server: Server) => {
  //get all wishes
  server.route({
    method: "GET",
    path: "/wishlist",
    handler: async (_request: Request) => {
      return WishlistController.findAll();
    },
  });

  //create wish
  server.route({
    method: "POST",
    path: "/admin/wish",
    options: {
      validate: {
        payload: Joi.object({
          link: Joi.string().required(),
          name: Joi.string().required(),
          origin: Joi.string().required(),
          maker: Joi.string().required(),
          version: Joi.string().required(),
          price: Joi.number().required(),
        }),
      },
    },
    handler: async (request: Request, h: ResponseToolkit) => {
      const payload: any = request.payload;

      // Check if all fields are present
      if (!payload.link || !payload.name || !payload.origin || !payload.maker || !payload.version || !payload.price) {
        throw Boom.badRequest("Missing fields");
      }

      await WishlistController.create(payload.link, payload.name, payload.origin, payload.maker, payload.version, payload.price);

      const data = { status: "Wish created" };
      return h.response(data).code(200);
    },
  });

  //delete wish
  server.route({
    method: "DELETE",
    path: "/admin/wish/{uuid}",
    options: {
      validate: {
        params: Joi.object({
          uuid: Joi.string().required(),
        }),
      },
    },
    handler: async (request: Request, h: ResponseToolkit) => {
      const uuid = request.params.uuid;
      await WishlistController.deleteWish(uuid);

      const data = { status: "Wish deleted" };
      return h.response(data).code(200);
    },
  });
};