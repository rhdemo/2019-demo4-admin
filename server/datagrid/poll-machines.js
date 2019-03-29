const axios = require("axios");
const log = require("../utils/log")("datagrid/poll-machines");
const {OUTGOING_MESSAGE_TYPES} = require("../message-types");
const broadcast = require("../utils/broadcast");


async function pollMachines(interval) {
  global.pollInterval = setInterval(function () {
    for (let prop in global.machines) {
      refreshMachine(global.machines[prop]);
    }
  }, interval);
}

async function refreshMachine(machine) {
  try {
    let response = await axios({method: "get", url: machine.url});
    //TODO? diff and broadcast only if changed
    if (machine.value !== response.data) {
      machine.value = response.data;
      broadcast(OUTGOING_MESSAGE_TYPES.MACHINE, {id: machine.id, value: machine.value});
    }
  } catch (error) {
    log.error(`error occurred in http call get counter for machine ${machine.id}`);
    log.error(error)
  }
}


module.exports = pollMachines;

