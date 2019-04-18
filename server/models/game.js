const uuidv4 = require("uuid/v4");
const GAME_STATES = require("./game-states");
const shakeDemo = require("./shake-demo");
const motions = require("./motions");
const bypassAI = require("./bypass-ai");
const ai = require("./ai");
const scoring = require("./scoring");
const damage = require("./damage");
const initialDamageMultiplier =  require("./damage-multiplier");

class Game {
  constructor() {
    this.id = uuidv4();
    this.state = GAME_STATES.LOBBY;
    this.motions = {...motions};
    this.shakeDemo = {...shakeDemo};
    this.bypassAI = bypassAI;
    this.ai = {...ai};
    this.scoring = {...scoring};
    this.damage = {...damage};
    this.damageMultiplier = initialDamageMultiplier;
  }
}

module.exports = Game;
