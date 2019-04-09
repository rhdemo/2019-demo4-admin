const log = require("../utils/log")("datagrid/read-planner-config");
const {DATAGRID_KEYS} = require("./constants");

async function readPlannerConfig() {
  let configStr = await global.dataClient.get(DATAGRID_KEYS.OPT_CONFIG);
  if (configStr) {
    global.optaPlannerConfig = JSON.parse(configStr);
  } else {
    global.optaPlannerConfig = undefined;
  }
  return global.optaPlannerConfig;
}


module.exports = readPlannerConfig;
