import fs from "fs";
import dotenv from "dotenv";
import logger from "./logger";
// This should be set in the Env of EBS
export const PATH = process.env["ENV_FILE"] || ".env.prod.file";
if (!PATH) {
  logger.error("Environment path not set.");
  process.exit(1);
}
if (fs.existsSync(PATH)) {
  logger.debug(`Using ${PATH} file to supply config environment variables`);
  dotenv.config({ path: PATH });
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
export const MONGODB_URI = process.env["MONGODB_URI"];
export const PORT_NUMBER = process.env["PORT"];
export const X_API_KEY = process.env["X_API_KEY"];
export const ORIGIN = process.env["ORIGIN"];
if (!MONGODB_URI) {
  logger.error(
    "No mongo connection string. Set MONGODB_URI environment variable."
  );
  process.exit(1);
}
if (!PORT_NUMBER) {
  logger.error("No port number defined. Set PORT_NUMBER environment variable.");
  process.exit(1);
}
