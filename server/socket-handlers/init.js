const axios = require("axios");
const env = require("env-var");
const log = require("../utils/log")("socket-handlers/init");
const {OUTGOING_MESSAGE_TYPES} = require("../message-types");
const OPTAPLANNER_URL = env.get("OPTAPLANNER_URL").asString();

async function initHandler(ws, messageObj) {
  ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.GAME, data: global.game, action: "modify"}));

  for (let prop in global.machines) {
    let {id, value} = global.machines[prop];
    ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.MACHINE, data: {id, value}, action: "modify"}));
  }


  ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.OPT_CONFIG, data: global.optaPlannerConfig, action: "modify"}));
  sendOptEvents(ws);
  sendOptOptions(ws);
}

async function sendOptEvents(ws) {
  let clientIterator = await global.optClient.iterator(1);

  let entry = {done: true};

  do {
    entry = await clientIterator.next();
    if (!entry.done) {
      log.debug(entry.key + ' = ' + entry.value + '\n');
      ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.OPT_EVENT, data: {key: entry.key, value: JSON.parse(entry.value)}, action: "modify"}));
    }

  } while (!entry.done);
}

async function sendOptOptions(ws) {
  try {
    let response = await axios({
      method: "GET",
      url: new URL("/simulation/damageDistributionTypes", OPTAPLANNER_URL).href
    });
    let simulationDamageTypes = response.data;
    ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.OPT_OPTIONS, data: {simulationDamageTypes}}));
  } catch (error) {
    log.error("error occurred in http call to optaplanner API: ", error.message);
  }
}

module.exports = initHandler;
