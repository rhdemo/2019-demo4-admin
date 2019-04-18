const log = require("../utils/log")("socket-handlers");
const {INCOMING_MESSAGE_TYPES} = require("../message-types");


function processSocketMessage(ws, messageStr) {
  let messageObj = JSON.parse(messageStr);

  switch (messageObj.type) {
    case INCOMING_MESSAGE_TYPES.INIT:
      initHandler(ws, messageObj);
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

    case INCOMING_MESSAGE_TYPES.RESET_SHAKE_DEMO:
      resetShakeDemoHandler(ws, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.RESET_GAME:
      resetGameHandler(ws, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.RESET_AI:
      resetAiHandler(ws, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.RESET_SCORING:
      resetScoringHandler(ws, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.RESET_DAMAGE:
      resetDamageHandler(ws, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.RESET_MACHINES:
      resetMachinesHandler(ws, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.OPTAPLANNER:
      optaplannerHandler(ws, messageObj);
      break;

    default:
      log.warn(`Unhandled Game Message of type "${messageStr}"`);
      break;
  }
}

/**
 * Wraps a message handler with some generic logging
 * @param {Function} fn The handler function implementation
 * @param {String} type The named type of the payload
 */
function wrapMessageHandler (type, fn) {
    return function messageHandlerWrapper (ws, messageObj) {
        log.info(`processing message of type "${type}"`);
        log.debug(`payload for message "${type}" was: %j`, messageObj);

        fn(ws, messageObj)
    }
}

const initHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.INIT, require("./init"));
const pingHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.PING, function (ws, messageObj) {});
const gameHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.GAME, require("./game"));
const resetHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.RESET, require("./reset"));
const resetShakeDemoHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.RESET_SHAKE_DEMO, require("./reset-shake-demo"));
const resetGameHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.RESET_GAME, require("./reset-game"));
const resetAiHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.RESET_AI, require("./reset-ai"));
const resetScoringHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.RESET_SCORING, require("./reset-scoring"));
const resetDamageHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.RESET_DAMAGE, require("./reset-damage"));
const resetMachinesHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.RESET_MACHINES, require("./reset-machines"));
const optaplannerHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.OPTAPLANNER, require("./optaplanner"));

module.exports = processSocketMessage;
