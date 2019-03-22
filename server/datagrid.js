const log = require("../common/utils/log")("admin-data");
const infinispan = require("infinispan");
const env = require("env-var");
const DATAGRID_HOST = env.get("DATAGRID_HOTROD_SERVICE_HOST").asString();
const DATAGRID_PORT = env.get("DATAGRID_HOTROD_SERVICE_PORT").asIntPositive();

let dataClient;

async function initClient() {
  let client = await infinispan.client({port: DATAGRID_PORT, host: DATAGRID_HOST});
  log.info(`Connected to Infinispan admin data`);

  let stats = await client.stats();
  log.debug(stats);

  let listenerId = await client.addListener("create", key => handleDataChange(client,"create", key));
  client.addListener("modify", key => handleDataChange(client,"modify", key), {listenerId});
  client.addListener("remove", key => handleDataChange(client,"remove", key), {listenerId});

  return client;
}


async function handleDataChange(client, changeType, key) {
  log.info(`Data change: ${changeType} ${key}`);
  let value = await client.get(key);
  log.info(`value = ${value}`);
  switch (key) {
    case "game":
  }
}

async function initData() {
  try {
    dataClient = await initClient();
  } catch (error) {
    log.error(`Error connecting to Infinispan admin data: ${error.message}`);
    log.error(error);
  }
  return dataClient;
}

module.exports.initData = initData;