const uuidv4 = require("uuid/v4");
const {DATAGRID_KEYS} = require("../datagrid/constants");
const GAME_STATES = require("../models/game-states");
const motions = require("../models/motions");

async function resetGame(ws, messageObj) {
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
    let currentGame;
    let str = await global.dataClient.get(DATAGRID_KEYS.GAME);
    if (str) {
      currentGame = JSON.parse(str);
    } else {
      return;
    }

    currentGame.id = uuidv4();
    currentGame.state = GAME_STATES.LOBBY;
    currentGame.motions = {...motions};

    await global.dataClient.put(DATAGRID_KEYS.GAME, JSON.stringify(currentGame));
  } catch (error) {
    log.error(`error occurred resetting game settings. Error:`, error.message);
  }
}

module.exports = resetGame;
