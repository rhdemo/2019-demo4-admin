const proxy = require("http-proxy-middleware");


module.exports = function(app) {
  let devSocket = process.env.DEV_SOCKET || "http://localhost:8082";

  app.use(proxy("/admin-socket", { target: devSocket, ws: true }));
};
