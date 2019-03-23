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
    this.motions = {
      "shake": false,
      "draw-circle": false,
      "draw-triangle": false,
      "roll": false,
      "fever": false,
      "floss": false
    }
  }
}


module.exports.Game = Game;
module.exports.GameState = GameState;
module.exports.NUM_MACHINES = 10;
