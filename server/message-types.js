module.exports.INCOMING_MESSAGE_TYPES = {
  INIT: "init",
  GAME: "game",
  PING: "ping",
  RESET: "reset",
  RESET_SHAKE_DEMO: "reset-shake-demo",
  RESET_GAME: "reset-game",
  RESET_AI: "reset-ai",
  RESET_SCORING: "reset-scoring",
  RESET_DAMAGE: "reset-damage",
  RESET_MACHINES: "reset-machines",
  OPTAPLANNER: "optaplanner"
};

module.exports.OUTGOING_MESSAGE_TYPES = {
  ERROR: "error",
  HEARTBEAT: "heartbeat",
  GAME: "game",
  PING: "ping",
  MACHINE: "machine",
  OPT_OPTIONS: "optaplannerOptions",
  OPT_CONFIG: "optaplannerConfig",
  OPT_EVENT: "optaplanner"
};
