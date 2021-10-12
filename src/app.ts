import express from "express";
import passport from "./utils/passport";
import compression from "compression"; // compresses requests
import helmet from "helmet"; // web application security middleware
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { createRolesInDB } from "./prepwork";
import * as routes from "./routes";
import {
  MONGODB_URI,
  PORT_NUMBER,
  ENVIRONMENT,
  ORIGIN,
  SESSION_SECRET,
} from "./utils/secrets";
import logger from "./utils/logger";

const app = express();

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      logger.debug("Successfully connected to MongoDB.");
      createRolesInDB();
    })
    .catch((err: mongoose.Error) => {
      logger.error("Connection error", err);
      process.exit();
    });
}

app.use(express.json());
app.set("port", PORT_NUMBER);
app.set("env", ENVIRONMENT);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: ORIGIN }));
app.use(helmet());
app.use(compression());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET ?? "<fallback>",
    store: new MongoStore({
      mongoUrl: MONGODB_URI ?? "<fallback>",
      collectionName: "sessions",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
routes.registerHealthCheckRoute(app);
routes.registerRoutes(app);
export default app;
