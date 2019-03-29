const WebSocket = require("ws");
const log = require("../utils/log")("datagrid/game");
const {OUTGOING_MESSAGE_TYPE} = require("../message-types");
const readGame = require("./read-game");

async function gameHandler(client, changeType, key) {
    log.info("Game change");
    await readGame();
    broadcastGame();
}

function broadcastGame() {
  global.socketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPE.GAME, game}));
    }
  });
}


module.exports = gameHandler;

