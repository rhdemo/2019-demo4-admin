const axios = require("axios");
const env = require("env-var");
const log = require("../utils/log")("socket-handlers/optaplanner");

const OPTAPLANNER_URL = env.get("OPTAPLANNER_URL").asString();

async function optaplannerHandler(ws, messageObj) {
  log.debug(messageObj);
  try {
    await axios({
      method: messageObj.method || "POST",
      url: new URL(messageObj.path, OPTAPLANNER_URL).href,
      data: messageObj.data
    });
  } catch (error) {
    log.error("error occured in http call to prediction API:");
    log.error(error);
    ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.ERROR, data: {error}, action: "create"}));
  }
}


module.exports = optaplannerHandler;
