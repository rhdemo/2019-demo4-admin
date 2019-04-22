const WebSocket = require("ws");
const env = require("env-var");
const log = require("./utils/log")("admin-server");
const {OUTGOING_MESSAGE_TYPES} = require("./message-types");
const broadcast = require("./utils/broadcast");
const processSocketMessage = require("./socket-handlers/process-socket-message");
const machines = require("./models/machines");
const initData = require("./datagrid/init-data");
const pollMachines = require("./datagrid/poll-machines");
const initPlanner = require("./datagrid/init-planner");
const initPlayers = require("./datagrid/init-players");

const PORT = env.get("PORT", "8080").asIntPositive();
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";

global.game = {
    id: null,
    state: "loading"
};

global.machines = machines;

global.leaderboard = {
  players: []
};

global.optaPlannerConfig = {};

global.playerStats = {};

global.socketServer = new WebSocket.Server({
  host: IP,
  port: PORT
});

global.dataClient = null;

log.info(`Started Admin server on ${IP}:${PORT}`);

setInterval(function () {
  broadcast(OUTGOING_MESSAGE_TYPES.HEARTBEAT);
}, 5000);

initData()
  .then(() => initPlanner())
  .then(() => initPlayers())
  .then(client => {
    global.socketServer.on("connection", function connection(ws) {
      ws.on("message", function incoming(message) {
        processSocketMessage(ws, message);
      });
    });
    pollMachines(500);
    setTimeout(() => pollMachines(10000, true), 250);
  });
