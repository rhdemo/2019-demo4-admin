const Game = require("../models/game");
const {DATAGRID_KEYS} = require("../datagrid/constants");

async function resetHandler(ws, messageObj) {
  try {
    await global.playerClient.clear();
  } catch (error) {
    log.error(`error occurred resetting players. Error:`, error.message);
  }

  try {
    await global.leaderboardClient.put(DATAGRID_KEYS.LEADERBOARD, JSON.stringify({players: []}));
  } catch (error) {
    log.error(`error occurred resetting leaderboard. Error:`, error.message);
  }

  try {
    await global.dataClient.put(DATAGRID_KEYS.GAME, JSON.stringify(new Game()));
  } catch (error) {
    log.error(`error occurred creating new game. Error:`, error.message);
  }
}

module.exports = resetHandler;
