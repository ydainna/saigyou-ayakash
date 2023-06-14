import { Server } from "@hapi/hapi";

export const initPictureRoutes = async (server: Server) => {
  server.route({
    method: "GET",
    path: "/img/{_file}", // _file is a placeholder for the file name
    options: {
      auth: false,
    },
    handler: {
      directory: {
        path: "public/img/", // Path to the folder containing the images
      },
    },
  });
};
