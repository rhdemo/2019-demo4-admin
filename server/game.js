const uuidv4 = require('uuid/v4');

const GameState = {
  ACTIVE: "active",
  PAUSED: "paused",
  STOPPED: "stopped",
  LOADING: "loading",
  READY: "ready",
  LOBBY: "lobby"
};

class Game {
  constructor() {
    this.id = id || uuidv4();
    this.state = GameState.LOBBY;
  }
}


module.exports.Game = Game;
module.exports.GameState = GameState;
