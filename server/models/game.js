const uuidv4 = require('uuid/v4');
const {DATAGRID_KEY_PREFIXES} = require("../datagrid");

class Game {
  constructor() {
    this.id = uuidv4();

    this.state = "lobby";

    this.motions = {
      shake: false,
      circle: false,
      x: false,
      roll: false,
      fever: false,
      floss: false,
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
      machine1: 100,
      machine2: 100,
      machine3: 100,
      machine4: 100,
      machine5: 100,
      machine6: 100,
      machine7: 100,
      machine8: 100,
      machine9: 100,
      machine10: 100
    }
  }
}

module.exports = Game;
