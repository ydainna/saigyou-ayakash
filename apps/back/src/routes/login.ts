import Boom from "@hapi/boom";
import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import Joi from "joi";
import UserModel from "../database/models/UserModel";
import jwt from "jsonwebtoken";

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

      // Create a token
      const token = jwt.sign(
        {
          iat: Math.floor(Date.now() / 1000),
          iss: process.env.JWT_ISSUER || "",
          exp: Math.floor(Date.now() / 1000) + 604800,
          displayName: user.displayName,
          avatar: user.avatar,
        },
        process.env.JWT_SECRET || ""
      );

      const data = { token: token };
      return h.response(data).code(200);
    },
  });
};
