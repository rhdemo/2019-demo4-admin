const {DATAGRID_KEYS} = require("../datagrid/constants");
const ai = require("../models/ai");
const bypassAI = require("../models/bypass-ai");

async function resetAI(ws, messageObj) {
  try {
    let currentGame;
    let str = await global.dataClient.get(DATAGRID_KEYS.GAME);
    if (str) {
      currentGame = JSON.parse(str);
    } else {
      return;
    }

    currentGame.ai = {...ai};
    currentGame.bypassAI = bypassAI;

    await global.dataClient.put(DATAGRID_KEYS.GAME, JSON.stringify(currentGame));
  } catch (error) {
    log.error(`error occurred resetting AI settings. Error:`, error.message);
  }
}

module.exports = resetAI;
