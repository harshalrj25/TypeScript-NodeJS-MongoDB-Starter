import { Response, Request, NextFunction, Express, Router } from "express";
import { PathParams, RequestHandler } from "express-serve-static-core";
import passport from "passport";
import * as auth from "./components/auth/auth.route";
import * as user from "./components/user/user.route";
const addRoute = (
  app: Express,
  url: PathParams,
  routes: RequestHandler,
  isAuthenticated: boolean
) => {
  isAuthenticated
    ? app.use(url, passport.authenticate("bearer", { session: false }), routes)
    : app.use(url, routes);
};

const register = (app: Express) => {
  addRoute(app, "/user", user.routes, true);
  addRoute(app, "/auth", auth.routes, false);
};

export const registerHealthCheckRoute = (app: Express) => {
  const router = Router();
  router.get("/", function (req, res, next) {
    res.json({ status: "server is up & running.." });
  });
  app.use("/health", router);
};
export let registerRoutes = register;
