const log = require("../utils/log")("socket-handlers/unauthorized");
const {OUTGOING_MESSAGE_TYPES} = require("../message-types");

//prevents unauthorized changes
async function unauthorizedHandler(ws, messageObj) {
  ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.VALIDATED, data: false}));
  ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.ERROR, data: {code: 403, message: "Unauthorized"}}));
  log.warn("Unauthorized socket message", messageObj);
}

module.exports = unauthorizedHandler;
