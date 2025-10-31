const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const roleRoute = require("./roleRoute");
const authorizationRoute = require("./authorizationRoute");
const siteRouter = require("./siteRoutes");
const registerRoutes = (app) => {
  app.use("/api/users", userRoute);
  app.use("/api/roles", roleRoute);
  app.use("/api/sites", siteRouter);
  app.use("/api/authorization", authorizationRoute);
};

module.exports = registerRoutes;
