const axios = require("axios");
const env = require("env-var");
const log = require("../utils/log")("socket-handlers/optaplanner");

const NUM_MACHINES = 10;
const OPTAPLANNER_URL = env.get("OPTAPLANNER_URL").asString();

async function resetMachines(ws, messageObj) {
  let promises = [];

  for (let i = 0; i < NUM_MACHINES; i++) {
    promises.push(axios({
      method: "POST",
      url: new URL("/simulation/heal", OPTAPLANNER_URL).href,
      data: {machineIndex: i}
    }));
  }

  for (let i = 0; i < NUM_MACHINES; i++) {
    try {
      await promises[i];
    } catch (error) {
      log.error("error occured in http call to optaplanner API: ", error.message);
    }
  }
}


module.exports = resetMachines;
