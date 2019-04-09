const uuidv4 = require('uuid/v4');

class Game {
  constructor() {
    this.id = uuidv4();

    this.state = "lobby";

    this.shakeDemo = {
      enabled: true,
      multiplier: 2,
      maxPerSecond: 1000
    };

    this.motions = {
      shake: false,
      circle: false,
      x: false,
      roll: false,
      fever: false,
      floss: false,
    };

    this.bypassAI = false;

    this.scoring = {
      shake: 1,
      circle: 5,
      x: 5,
      roll: 10,
      fever: 20,
      floss: 100,
    };

    this.damage = {
      shake: 0.002,
      circle: 0.01,
      x: 0.01,
      roll: 0.02,
      fever: 0.02,
      floss: 0.10,
    };

    this.damageMultiplier =  1
  }
}

module.exports = Game;
