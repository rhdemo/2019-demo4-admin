const {DATAGRID_KEYS} = require("./constants");

async function readGame() {
    let gameStr = await global.dataClient.get(DATAGRID_KEYS.GAME);
    if (gameStr) {
        global.game = JSON.parse(gameStr);
    }
    return global.game;
}


module.exports = readGame;

