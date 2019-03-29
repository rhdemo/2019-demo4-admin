const log = require("../utils/log")("socket-handlers/connection");
const {OUTGOING_MESSAGE_TYPES} = require("../message-types");

async function connectionHandler(ws, messageObj) {
  log.debug("connectionHandler", messageObj);
  ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.GAME, data: global.game}));

  for (let prop in global.machines) {
    let {id, value} = global.machines[prop];
    ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.MACHINE, data: {id, value}}));
  }

}


module.exports = connectionHandler;
