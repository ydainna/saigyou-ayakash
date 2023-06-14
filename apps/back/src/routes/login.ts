import Boom from "@hapi/boom";
import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import UserModel from "../database/models/UserModel";

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

      // Check if all fields are present
      if (!user) {
        throw Boom.unauthorized("Invalid username or password");
      }

      // Set auth
      request.cookieAuth.set({
        id: user.id,
        scope: user.scope,
      });

      return h.response().code(200);
    },
  });

  //logout
  server.route({
    method: "POST",
    path: "/admin/logout",
    handler: async (request: Request, h: ResponseToolkit) => {
      request.cookieAuth.clear();
      return h.response().code(200);
    },
  });
};
