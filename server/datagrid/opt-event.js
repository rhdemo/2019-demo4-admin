const log = require("../utils/log")("datagrid/opt-event");
const {OUTGOING_MESSAGE_TYPES} = require("../message-types");
const broadcast = require("../utils/broadcast");

async function optEventHandler(client, changeType, key) {
    const optEvent = await global.optClient.get(key);
    log.debug(key, optEvent);
    if (optEvent) {
      broadcast(OUTGOING_MESSAGE_TYPES.OPT_EVENT, {key, value: JSON.parse(optEvent)}, changeType);
    } else if (changeType === "remove"){
      broadcast(OUTGOING_MESSAGE_TYPES.OPT_EVENT, {key, value: undefined}, changeType);
    }
}

module.exports = optEventHandler;

