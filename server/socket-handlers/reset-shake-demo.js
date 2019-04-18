const {DATAGRID_KEYS} = require("../datagrid/constants");
const shakeDemo = require("../models/shake-demo");

async function resetShakeDemo(ws, messageObj) {
  try {
    let currentGame;
    let str = await global.dataClient.get(DATAGRID_KEYS.GAME);
    if (str) {
      currentGame = JSON.parse(str);
    } else {
      return;
    }

    currentGame.shakeDemo = {...shakeDemo};

    await global.dataClient.put(DATAGRID_KEYS.GAME, JSON.stringify(currentGame));
  } catch (error) {
    log.error(`error occurred resetting shake demo settings. Error:`, error.message);
  }
}

module.exports = resetShakeDemo;
