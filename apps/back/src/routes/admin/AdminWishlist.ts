import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import Boom from "@hapi/boom";
import { WishlistController } from "../../database/controllers/WishController";

export const initAdminWishlistRoutes = async (server: Server) => {
  //create wish
  server.route({
    method: "POST",
    path: "/admin/wish",
    options: {
      auth: {
        strategy: "session",
        scope: "admin",
      },
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
        throw Boom.badRequest("Veuillez remplir tous les champs !");
      }

      await WishlistController.create(payload.link, payload.name, payload.origin, payload.maker, payload.version, payload.price);

      const data = { message: "Le voeux a bien été crée." };
      return h.response(data).code(200);
    },
  });

  //delete wish
  server.route({
    method: "DELETE",
    path: "/admin/wish/{uuid}",
    options: {
      auth: {
        strategy: "session",
        scope: "admin",
      },
      validate: {
        params: Joi.object({
          uuid: Joi.string().required(),
        }),
      },
    },
    handler: async (request: Request, h: ResponseToolkit) => {
      const uuid = request.params.uuid;
      await WishlistController.deleteWish(uuid);

      const data = { message: "Le voeux a bien été supprimé." };
      return h.response(data).code(200);
    },
  });
};
