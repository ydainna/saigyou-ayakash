import { Request, Server, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";
import { FigureController } from "../../database/controllers/FigureController";
import fs from "fs";
import Boom from "@hapi/boom";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import forge from "node-forge";

export const initAdminFiguresRoutes = async (server: Server) => {
  //create figure
  server.route({
    method: "POST",
    path: "/admin/figures",
    options: {
      auth: {
        strategy: "session",
        scope: "admin",
      },
      payload: {
        maxBytes: 10485760, // max: 10Mo
        parse: true, // parse the payload
        multipart: { output: "data" }, // parse the payload as multipart/form-data
      },
      validate: {
        payload: Joi.object({
          img: Joi.any().required(),
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
      if (!payload.img) {
        throw Boom.badRequest("No file detected");
      }

      // Check if the file is too big
      if (payload.img.byteLength > 10485760) {
        throw Boom.badRequest("File too big");
      }

      // Check if the file is a jpg
      if (!payload.img.toString("base64").startsWith("/9j/")) {
        throw Boom.badRequest("File is not a jpg");
      }

      const randomFileName = forge.md.md5.create().update(uuidv4()).digest().toHex() + ".jpg";
      fs.writeFileSync(path.resolve("public", "img", randomFileName), payload.img);
      await FigureController.create(randomFileName, payload.name, payload.origin, payload.maker, payload.version, payload.price);

      const data = { status: "Figure created" };
      return h.response(data).code(200);
    },
  });

  //delete figure
  server.route({
    method: "DELETE",
    path: "/admin/figures/{uuid}",
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
      const figure = await FigureController.getFigure(uuid);

      // Check if the figure exists
      if (!figure) {
        throw Boom.badRequest("Invalid figure uuid");
      }

      // Check if the figure has an image
      if (!figure.img) {
        throw Boom.badRequest("Invalid figure img");
      }

      fs.unlinkSync(path.resolve("public", "img", figure.img));
      await FigureController.deleteFigure(uuid);

      const data = { status: "Figure deleted" };
      return h.response(data).code(200);
    },
  });

  server.route({
    method: "PATCH",
    path: "/admin/figures/{uuid}",
    options: {
      auth: {
        strategy: "session",
        scope: "admin",
      },
      validate: {
        params: Joi.object({
          uuid: Joi.string().required(),
        }),
        payload: Joi.object({
          name: Joi.string(),
          origin: Joi.string(),
          maker: Joi.string(),
          version: Joi.string(),
          price: Joi.number(),
        }),
      },
    },
    handler: async (request: Request, h: ResponseToolkit) => {
      const uuid = request.params.uuid;
      const payload: any = request.payload;

      const figure = await FigureController.getFigure(uuid);

      // Check if the figure exists
      if (!figure) {
        throw Boom.badRequest("Invalid figure uuid");
      }

      await FigureController.updateFigure(uuid, payload.name, payload.origin, payload.maker, payload.version, payload.price);

      const data = { status: "Figure updated" };
      return h.response(data).code(200);
    },
  });
};
