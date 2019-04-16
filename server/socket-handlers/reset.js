const Game = require("../models/game");
const {DATAGRID_KEYS} = require("../datagrid/constants");

async function resetHandler(ws, messageObj) {
  const clearPlayers = global.playerClient.clear();
  const clearLeaderboard = global.dataClient.put(DATAGRID_KEYS.LEADERBOARD, JSON.stringify({players: []}));

  try {
    await clearPlayers;
  } catch (error) {
    log.error(`error occurred clearing players. Error:`, error.message);
  }

  try {
    await clearLeaderboard;
  } catch (error) {
    log.error(`error occurred resetting the leaderboard. Error:`, error.message);
  }

  try {
    await global.dataClient.put(DATAGRID_KEYS.GAME, JSON.stringify(new Game()));
  } catch (error) {
    log.error(`error occurred creating new game. Error:`, error.message);
  }
}

module.exports = resetHandler;
