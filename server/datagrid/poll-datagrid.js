const log = require("../utils/log")("datagrid/poll-datagrid");
const initData = require("./init-data");
const initPlanner = require("./init-planner");
const initPlayers = require("./init-players");
const readMachines = require("./read-machines");
const {DATAGRID_KEYS} = require("./constants");


function pollDatagrid(interval) {
  setTimeout(async () => {
    log.debug("checking Datagrid connections");
    await checkDataClient();
    await checkOptClient();
    await checkPlayerClient();
    await readMachines(true);
    pollDatagrid(interval);
  }, interval);
}

async function checkDataClient() {
  log.debug("checkDataClient");
  try {
    let str = await global.dataClient.get(DATAGRID_KEYS.GAME);
    if (str) {
      global.game = JSON.parse(str);
    } else {
      log.error("Game configuration missing");
    }

    str = await global.dataClient.get(DATAGRID_KEYS.OPT_CONFIG);
    if (str) {
      global.optaPlannerConfig = JSON.parse(str);
    } else {
      log.error("OptaPLanner configuration missing");
    }
  } catch (e) {
    log.error(e.message);
    await reconnectDataClient();
  }
}

async function reconnectDataClient() {
  log.info("Attempting to reconnect to Infinispan default cache");
  try {
    await initData();
  } catch (e) {
    log.error("Failed to reconnect to Infinispan default cache.  Error: ", e.message);
  }
}

async function checkOptClient() {
  log.debug("checkOptClient");
  try {
    await global.optClient.stats();
  } catch (e) {
    log.error(e.message);
    await reconnectOptClient();
  }
}

async function reconnectOptClient() {
  log.info("Attempting to reconnect to Infinispan OptaPlanner cache");
  try {
    await initPlanner();
  } catch (e) {
    log.error("Failed to reconnect to Infinispan OptaPlanner cache.  Error: ", e.message);
  }
}

async function checkPlayerClient() {
  log.debug("checkPlayerClient");
  try {
    global.playerStats = await global.playerClient.stats();

    const str = await global.playerClient.get(DATAGRID_KEYS.LEADERBOARD);
    if (str) {
      global.leaderboard = JSON.parse(str);
    } else {
      log.error("Leaderboard missing");
    }
  } catch (e) {
    log.error(e.message);
    await reconnectPlayerClient();
  }
}

async function reconnectPlayerClient() {
  log.info("Attempting to reconnect to Infinispan players cache");
  try {
    await initPlayers();
  } catch (e) {
    log.error("Failed to reconnect to Infinispan players cache.  Error: ", e.message);
  }
}


module.exports = pollDatagrid;
