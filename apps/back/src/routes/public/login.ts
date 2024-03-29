import Boom from "@hapi/boom";
import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import UserModel from "../../database/models/UserModel";

export const initLoginRoutes = async (server: Server) => {
  //login
  server.route({
    method: "POST",
    path: "/admin/login",
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
      auth: false,
    },
    handler: async (request: Request, h: ResponseToolkit) => {
      const payload: any = request.payload;

      const user = await UserModel.findOne({
        username: payload.username,
        password: payload.password,
      });

      if (!user) {
        throw Boom.unauthorized("Nom de compte ou mot de passe incorrect !");
      }

      // Set auth
      request.cookieAuth.set({
        id: user.id,
        scope: user.scope,
      });

      const data = {
        displayName: user.displayName,
        message: "Vous êtes désormais êtes connecté.",
      };

      return h.response(data).code(200);
    },
  });

  //logout
  server.route({
    method: "GET",
    path: "/admin/logout",
    handler: async (request: Request, h: ResponseToolkit) => {
      if (!request.auth.isAuthenticated) {
        throw Boom.unauthorized("Vous n'êtes pas connecté !");
      }

      request.cookieAuth.clear();

      const data = { message: "Vous êtes désormais déconnecté." };
      return h.response(data).code(200);
    },
  });
};
