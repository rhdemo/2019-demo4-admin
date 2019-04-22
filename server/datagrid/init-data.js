const infinispan = require("infinispan");
const env = require("env-var");

const log = require("../utils/log")("datagrid");
const {DATAGRID_KEYS} = require("./constants");
const createGame = require("./create-game");
const createLeaderboard = require("./create-leaderboard");
const gameHandler = require("./game");
const leaderboardHandler = require("./leaderboard");
const readPlannerConfig = require("./read-planner-config");
const plannerConfigHandler = require("./planner-config");

const DATAGRID_HOST = env.get("DATAGRID_HOST").asString();
const DATAGRID_HOTROD_PORT = env.get("DATAGRID_HOTROD_PORT").asIntPositive();

async function initClient() {
  let client = await infinispan.client({port: DATAGRID_HOTROD_PORT, host: DATAGRID_HOST});
  log.info(`Connected to Infinispan game data`);

  let stats = await client.stats();
  log.debug(stats);

  let listenerId = await client.addListener("create", key => handleDataChange(client,"create", key));
  client.addListener("modify", key => handleDataChange(client,"modify", key), {listenerId});
  client.addListener("remove", key => handleDataChange(client,"remove", key), {listenerId});

  return client;
}

async function handleDataChange(client, changeType, key) {
  log.debug(`Data change: ${changeType} ${key}`);
  switch (key) {
    case DATAGRID_KEYS.GAME:
      gameHandler(client, changeType, key);
      break;
    case DATAGRID_KEYS.LEADERBOARD:
      leaderboardHandler(client, changeType, key);
      break;
    case DATAGRID_KEYS.OPT_CONFIG:
      plannerConfigHandler(client, changeType, key);
      break;
  }
}

async function initData() {
  try {
    global.dataClient = await initClient();
    createGame();
    createLeaderboard();
    readPlannerConfig();
  } catch (error) {
    log.error(`Error connecting to Infinispan admin data: ${error.message}`);
    log.error(error);
  }
  return global.dataClient;
}

module.exports = initData;
