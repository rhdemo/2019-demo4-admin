const env = require("env-var");

const DATAGRID_HOST = env.get("DATAGRID_HOST").asString();
const DATAGRID_CONSOLE_HOST = env.get("DATAGRID_CONSOLE_HOST", DATAGRID_HOST).asString();
const DATAGRID_CONSOLE_PORT = env.get("DATAGRID_CONSOLE_PORT").asIntPositive();

const MAX_MACHINES = 10;

let machineUrl = key => {
  return 'http://' +
  `${DATAGRID_CONSOLE_HOST}:${DATAGRID_CONSOLE_PORT}` +
    '/management/subsystem/datagrid-infinispan/cache-container/clustered/counters/COUNTERS/strong-counter/' +
    key + '?operation=attribute&name=value';
};

let machines = {};
for (let i = 0; i < MAX_MACHINES; i++) {
  let id = `machine-${i}`;
  let url = machineUrl(id);
  machines[`MACHINE_${i}`] = {id, url}
}

module.exports = machines;
