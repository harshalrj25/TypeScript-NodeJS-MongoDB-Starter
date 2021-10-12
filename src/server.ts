import app from "./app";

const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log(
    "  Health check can be done at http://localhost:%d/health \n",
    app.get("port")
  );
  console.log("  Press CTRL-C to stop\n");
});
export default server;
