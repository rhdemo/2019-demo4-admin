const Game = require("../models/game");
const {DATAGRID_KEYS} = require("../datagrid/constants");

async function resetHandler(ws, messageObj) {
  global.dataClient.put(DATAGRID_KEYS.GAME, JSON.stringify(new Game()));
}

module.exports = resetHandler;
