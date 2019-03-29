const log = require("../utils/log")("datagrid");
const {DATAGRID_KEYS} = require("./constants");
const Game = require("../models/game");

async function initGame() {
    let gameStr = await global.dataClient.get("game");

    if (gameStr) {
        global.game = JSON.parse(gameStr);
    } else {
        global.game = new Game();
        log.debug("Game not found, writing new game: " + JSON.stringify(global.game));
        global.dataClient.put(DATAGRID_KEYS.GAME, JSON.stringify(global.game));
    }

    return global.game;
}


module.exports = initGame;

