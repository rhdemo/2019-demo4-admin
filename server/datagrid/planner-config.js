const log = require("../utils/log")("datagrid/planner-config");
const OUTGOING_MESSAGE_TYPE = require("../message-types").OUTGOING_MESSAGE_TYPES;
const readPlannerConfig = require("./read-planner-config");
const broadcast = require("../utils/broadcast");

async function plannerConfigHandler(client, changeType, key) {
    log.info("broadcasting planner config change");
    await readPlannerConfig();
    broadcast(OUTGOING_MESSAGE_TYPE.OPT_CONFIG, global.optaPlannerConfig, changeType);
}


module.exports = plannerConfigHandler;

