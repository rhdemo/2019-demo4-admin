const request = require("../utils/request");
const env = require("env-var");
const log = require("../utils/log")("socket-handlers/optaplanner");

const OPTAPLANNER_URL = env.get("OPTAPLANNER_URL").asString();

const OPTAPLANNER_ACTIONS = {
  reset: {method: "POST", path: "/app/reset"},
  setupStage: {method: "POST", path: "/app/setupStage"},
  removeMechanic: {method: "POST", path: "/app/removeMechanic"},
  addMechanic: {method: "POST", path: "/app/addMechanic"},
  pauze: {method: "POST", path: "/app/pauzeDispatch"},
  unpauze: {method: "POST", path: "/app/unpauzeDispatch"},
  stop: {method: "POST", path: "/simulation/stop"},
  start: {method: "POST", path: "/simulation/start"},
  damage: {method: "POST", path: "/simulation/damage"},
  heal: {method: "POST", path: "/simulation/heal"}
};

async function optaplannerHandler(ws, messageObj) {
  log.debug(messageObj);
  const {method, path} = OPTAPLANNER_ACTIONS[messageObj.action];

  if (!path) {
    log.error(`OptaPlanner action ${messageObj.action} not found in message`, messageObj);
  }

  try {
   await request({
      method: method || "POST",
      url: new URL(path, OPTAPLANNER_URL).href,
      data: messageObj.data
    });
  } catch (error) {
    log.error("error occured in http call to optaplanner API: ", error.message);
  }
}


module.exports = optaplannerHandler;
