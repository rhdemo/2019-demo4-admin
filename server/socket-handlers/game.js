const {DATAGRID_KEYS} = require("../datagrid/constants");

async function gameHandler(ws, messageObj) {
  global.dataClient.put(DATAGRID_KEYS.GAME, JSON.stringify(messageObj.game));
}

module.exports = gameHandler;

