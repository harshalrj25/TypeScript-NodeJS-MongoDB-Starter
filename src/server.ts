import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MONGODB_URI, PORT_NUMBER, ENVIRONMENT, ORIGIN } from "./utils/secrets";
import { createRolesInDB } from "./prepwork";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.mongo();
  }

  public config(): void {
    this.app.set("port", PORT_NUMBER);
    this.app.set("env", ENVIRONMENT);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors({ origin: ORIGIN }));
  }

  public routes(): void {}

  private mongo() {
    const MONGODB_URI_WITH_CHECK = MONGODB_URI ?? "<fallback_url>";
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongo connection established");
      createRolesInDB();
    });
    connection.on("reconnected", () => {
      console.log("Mongo connection re-established");
    });
    connection.on("disconnected", () => {
      console.log("Mongo connection disconnected");
      console.log("Trying to reconnect with Mongo...");
      setTimeout(() => {
        mongoose.connect(MONGODB_URI_WITH_CHECK, {
          keepAlive: true,
          socketTimeoutMS: 3000,
          connectTimeoutMS: 3000,
        });
      }, 3000);
    });
    connection.on("close", () => {
      console.log("Mongo connection closed");
    });
    connection.on("error", (error: Error) => {
      console.log("Mongo connection ERROR: " + error);
    });
    const run = async () => {
      await mongoose.connect(MONGODB_URI_WITH_CHECK, {
        keepAlive: true,
      });
    };
    run().catch((error) => console.error(error));
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(
        "  App is running at http://localhost:%d in %s mode",
        this.app.get("port"),
        this.app.get("env")
      );
      console.log("  Press CTRL-C to stop\n");
    });
  }
}
const server = new Server();
server.start();
