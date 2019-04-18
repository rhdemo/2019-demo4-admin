const {DATAGRID_KEYS} = require("../datagrid/constants");
const damage = require("../models/damage");
const damageMultiplier = require("../models/damage-multiplier");

async function resetDamage(ws, messageObj) {
  try {
    let currentGame;
    let str = await global.dataClient.get(DATAGRID_KEYS.GAME);
    if (str) {
      currentGame = JSON.parse(str);
    } else {
      return;
    }

    currentGame.damage = {...damage};
    currentGame.damageMultiplier = damageMultiplier;

    await global.dataClient.put(DATAGRID_KEYS.GAME, JSON.stringify(currentGame));
  } catch (error) {
    log.error(`error occurred resetting damage settings. Error:`, error.message);
  }
}

module.exports = resetDamage;
