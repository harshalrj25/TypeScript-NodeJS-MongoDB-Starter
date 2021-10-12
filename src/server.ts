import app from "./app";
import logger from "./utils/logger";

const server = app.listen(app.get("port"), () => {
  logger.debug(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  logger.debug(
    "  Health check can be done at http://localhost:%d/health \n",
    app.get("port")
  );
  logger.debug("  Press CTRL-C to stop\n");
});
export default server;
