const {Machine} = require("./machine");

const NUM_MACHINES = 10;
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
    this.state = GameState.LOBBY;
    for (let i = 1; i <= NUM_MACHINES; i++) {
      this["machine" + i] = new Machine(i);
    }
  }
}


module.exports.Game = Game;
module.exports.GameState = GameState;
module.exports.NUM_MACHINES = NUM_MACHINES;