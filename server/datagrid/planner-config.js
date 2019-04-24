const log = require("../utils/log")("datagrid/planner-config");
const {OUTGOING_MESSAGE_TYPES} = require("../message-types");
const readPlannerConfig = require("./read-planner-config");
const broadcast = require("../utils/broadcast");

async function plannerConfigHandler(client, changeType, key) {
    log.info("broadcasting planner config change");
    await readPlannerConfig();
    broadcast(OUTGOING_MESSAGE_TYPES.OPT_CONFIG, global.optaPlannerConfig, changeType);
}


module.exports = plannerConfigHandler;

