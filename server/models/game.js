const uuidv4 = require('uuid/v4');

class Game {
  constructor() {
    this.id = uuidv4();

    this.state = "lobby";

    this.shakeDemo = {
      enabled: true,
      multiplier: 2,
      maxPerSecond: 5000
    };

    this.motions = {
      shake: false,
      circle: false,
      x: false,
      roll: false,
      fever: false,
      floss: false,
    };

    this.ai = {
      minProbability: {
        shake: 0.8,
        circle: 0.8,
        x: 0.8,
        roll: 0.8,
        fever: 0.8,
        floss: 0.8,
      }
    };

    this.scoring = {
      shake: 1,
      circle: 5,
      x: 5,
      roll: 10,
      fever: 20,
      floss: 100,
    };

    this.damagePercent =  {
      "machine-1": 100,
      "machine-2": 100,
      "machine-3": 100,
      "machine-4": 100,
      "machine-5": 100,
      "machine-6": 100,
      "machine-7": 100,
      "machine-8": 100,
      "machine-9": 100,
      "machine-10": 100
    }
  }
}

module.exports = Game;
