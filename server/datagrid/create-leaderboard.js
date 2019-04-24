const log = require("../utils/log")("datagrid/create-leaderboard");
const {DATAGRID_KEYS} = require("./constants");

async function createLeaderboard() {
  let leaderboardStr = await global.leaderboardClient.get(DATAGRID_KEYS.LEADERBOARD);

  if (leaderboardStr) {
    global.leaderboard = JSON.parse(leaderboardStr);
  } else {
    global.leaderboard = {
      players: []
    };
    log.info("Leaderboard not found, writing new leaderboard: " + JSON.stringify(global.leaderboard));
    global.leaderboardClient.put(DATAGRID_KEYS.LEADERBOARD, JSON.stringify(global.leaderboard));
  }

  return global.game;
}


module.exports = createLeaderboard;

