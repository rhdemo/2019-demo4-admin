class Machine {
  constructor(id) {
    this.id = id;
    this.health = 100;
    this.intensity = 0;
    this.beingFixed = false;
  }
}


module.exports.Machine = Machine;