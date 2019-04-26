const axios = require("axios");
const log = require("../utils/log")("datagrid/read-machines");
const {OUTGOING_MESSAGE_TYPES} = require("../message-types");
const broadcast = require("../utils/broadcast");
const MAX_HEALTH = 1000000000000000000;

async function readMachines(broadcastAll) {
  // log.debug("readMachines broadcastAll=", broadcastAll);
  let promises = [];
  for (let key in global.machines) {
    promises.push(refreshMachine(global.machines[key], broadcastAll));
  }

  return Promise.all(promises);
}

async function refreshMachine(machine, broadcastAll) {
  try {
    const startTime = new Date();
    let response = await axios({method: "get", url: machine.url});
    machine.value = response.data;
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000;
    if (timeDiff > 1) {
      log.warn(`Polling health took ${timeDiff.toFixed(1)} seconds`);
    }
  } catch (error) {
    log.error(`error occurred in http call get counter for machine ${machine.id}`);
    log.error(error.message);
    return null;
  }

  let percent =  Math.floor(machine.value / MAX_HEALTH * 100);
  if (broadcastAll || machine.percent !== percent) {
    machine.percent = percent;
    broadcast(OUTGOING_MESSAGE_TYPES.MACHINE, {id: machine.id, value: machine.value, percent: machine.percent}, "modify");
  }
  return machine;
}

module.exports = readMachines;
