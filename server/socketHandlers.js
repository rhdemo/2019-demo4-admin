const env = require("env-var");
const log = require("./utils/log")("socket-handlers");

const AUTH_TOKEN = env.get("AUTH_TOKEN").asString();

const {INCOMING_MESSAGE_TYPES} = require("./message-types");

function processSocketMessage(ws, messageStr) {
  let messageObj = JSON.parse(messageStr);

  switch (messageObj.type) {
    case INCOMING_MESSAGE_TYPES.CONNECTION:
      connectionHandler(ws, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.PING:
      pingHandler(ws, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.GAME:
      gameHandler(ws, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.RESET:
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
  updateGame(messageObj);
}

function resetHandler(ws, messageObj) {
  log.info("reset", messageObj);
  global.game = new Game();
  global.players = {};
}

function updateGame(messageObj) {
  if (AUTH_TOKEN && messageObj.token !== AUTH_TOKEN) {
    console.error("Unauthorized attempt to update game state");
    return;
  }

  global.game = messageObj;
  global.dataClient.put("game", JSON.stringify(messageObj));
}


module.exports.processSocketMessage = processSocketMessage;
