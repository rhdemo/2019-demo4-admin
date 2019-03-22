

const WebSocket = require("ws");
const env = require("env-var");
const Game = require("../common/models/game");
const log = require("./utils/log")("admin-server");

const PORT = env.get("PORT", "8080").asIntPositive();
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
const AUTH_TOKEN = env.get("AUTH_TOKEN").asString();

global.game = {
  state: "lobby"
};
global.players = {};

let game = global.game;
let players = global.players;

let dataClient;
require("./datagrid").initData().then(client => dataClient = client);


const adminSocket = new WebSocket.Server({
  host: IP,
  port: PORT
});

adminSocket.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    processMessage(ws, message);
  });
});

log.info(`Starting Admin WS server on ${IP}:${PORT}`);


setInterval(function () {
  adminSocket.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({type: "heartbeat"}));
    }
  });
}, 10000);


function processMessage(ws, messageStr) {
  let messageObj = JSON.parse(messageStr);

  switch (messageObj.type) {
    case "connection":
      connectionHandler(ws, messageObj);
      break;

    case "ping":
      pingHandler(ws, messageObj);
      break;

    case "game":
      gameHandler(ws, messageObj);
      break;

    case "machine":
      machineHandler(ws, messageObj);
      break;

    case "reset":
      resetHandler(ws, messageObj);
      break;

    default:
      log.warn("Unhandled Admin Message: ", messageStr);
      break;
  }
}

function connectionHandler(ws, messageObj) {
  ws.send(JSON.stringify({type: "game", game}));
}


function pingHandler(ws, messageObj) {
  log.info("ping", messageObj);
}

function gameHandler(ws, messageObj) {
  log.info("game", messageObj);
  dataClient.put("game", JSON.stringify(messageObj));
  updateGame(messageObj);
  broadcastGame();
}

function machineHandler(ws, messageObj) {
  log.info("machine", messageObj);
  updateMachine(messageObj);
  // if diff
  broadcastGame();
}

function resetHandler(ws, messageObj) {
  log.info("reset", messageObj);
  game = new Game();
  players = {};
  broadcastGame();
}

function updateGame(messageObj) {
  if (AUTH_TOKEN && messageObj.token !== AUTH_TOKEN) {
    console.error("Unauthorized attempt to update game state");
    return;
  }

  game.state = messageObj.state;
}

function updateMachine(messageObj) {
  if (AUTH_TOKEN && messageObj.token !== AUTH_TOKEN) {
    console.error("Unauthorized attempt to update machine");
    return;
  }

  let {machine} = messageObj;
  game["machine" + machine.id] = machine;
}

function broadcastGame() {
  broadcastAdmin(JSON.stringify({type: "game", game}));
}

function broadcastAdmin(message) {
  adminSocket.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}


module.exports.adminSocket = adminSocket;
module.exports.broadcastAdmin = broadcastAdmin;
