import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MONGODB_URI, PORT_NUMBER, ENVIRONMENT, ORIGIN } from "./utils/secrets";
import { createRolesInDB } from "./prepwork";
const app = express();
var corsOptions = {
  origin: ORIGIN,
};

app.use(cors(corsOptions));
app.use(express.json());
app.set("port", PORT_NUMBER);
app.set("env", ENVIRONMENT);

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Successfully connected to MongoDB.");
      createRolesInDB();
    })
    .catch((err: any) => {
      console.error("Connection error", err);
      process.exit();
    });
}
app.get("/", (req, res) => {
  res.send("Well done!");
});

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
