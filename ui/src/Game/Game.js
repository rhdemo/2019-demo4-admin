import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStop, faPlay, faPause, faUndo } from "@fortawesome/free-solid-svg-icons";

import "./Game.scss";

const MOTIONS = {
  SHAKE: "shake",
  CIRCLE: "circle",
  X: "x",
  ROLL: "roll",
  FEVER: "fever",
  FLOSS: "floss",
};


const GAME_STATES = {
  LOBBY: "lobby",
  STOPPED: "stopped",
  PAUSED: "paused",
  LOADING: "loading",
  ACTIVE: "active",
};

function Game({socket, game}) {
  if (!game) {
    return null;
  }

  function toggleShakeDemo() {
    let original = game.shakeDemo || {enabled: false, multiplier: 5};
    const enabled = !original.enabled;
    const multiplier = original.multiplier;
    let shakeDemo = {enabled, multiplier};
    socket.json({type: "game", game: {...game, shakeDemo}});
  }

  function updateMultiplier(event) {
    let original = game.shakeDemo || {enabled: false, multiplier: 5};
    const enabled = original.enabled;
    const multiplier = parseFloat(event.target.value);
    if (isNaN(multiplier)) {
      return;
    }
    let shakeDemo = {enabled, multiplier};
    socket.json({type: "game", game: {...game, shakeDemo}});
  }

  function toggleMotion(motion) {
    const motions = {...game.motions};
    motions[motion] = !motions[motion];
    socket.json({type: "game", game: {...game, motions: motions}});
  }

  function updateGameState(gameState) {
    socket.json({type: "game", game: {...game, state: gameState}});
  }

  function resetGame() {
    socket.json({type: "reset"});
  }

  let shakeDemo = game.shakeDemo || {enabled: false, multiplier: 5}

  return (
    <div className="game">

      <section className="section">
        <h1 className="title">Scaling Test</h1>
        <form className="enable-scaling">
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  name="scalingEnabled"
                  type="checkbox"
                  checked={shakeDemo.enabled}
                  onChange={toggleShakeDemo}/> Enable Shake Demo
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">Message Multiplier</label>
            <div className="field">
              <input
                className="input"
                type="number"
                value={shakeDemo.multiplier}
                onChange={updateMultiplier}
              />
            </div>
          </div>
        </form>
      </section>

      <section className="section">
        <h1 className="title">Game: {game.state}</h1>
        <form className="enable-motions">
          <div className="columns">
          {Object.values(MOTIONS).map(motion => (
              <div key={motion} className="field column">
                <div className="control">
                  <label className="checkbox">
                    <input
                      name={motion + "Enabled"}
                      type="checkbox"
                      checked={game.motions[motion]}
                      onChange={() => toggleMotion(motion)}/> {motion}
                  </label>
                </div>
              </div>
          ))}
          </div>
        </form>

        <div className="game-state">
          <div className="columns">
            <div className="column">
              <button
                className="button"
                type="button"
                onClick={() => {
                  updateGameState(GAME_STATES.LOBBY);
                }}>
                <FontAwesomeIcon icon={faHome}/> Lobby
              </button>
            </div>
            <div className="column">
              <button
                className="button"
                type="button"
                onClick={() => {
                  updateGameState(GAME_STATES.STOPPED);
                }}>
                <FontAwesomeIcon icon={faStop}/> Stop
              </button>
            </div>
            <div className="column">
              <button
                className="button"
                type="button"
                onClick={() => {
                  updateGameState(GAME_STATES.PAUSED);
                }}>
                <FontAwesomeIcon icon={faPause}/> Pause
              </button>
            </div>
            <div className="column">
              <button
                className="button"
                type="button"
                onClick={() => {
                  updateGameState(GAME_STATES.ACTIVE);
                }}>
                <FontAwesomeIcon icon={faPlay}/> Play
              </button>
            </div>
            <div className="column">
              <button
                className="button"
                type="button"
                onClick={() => {
                  resetGame();
                }}>
                <FontAwesomeIcon icon={faUndo}/> Reset
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Game;
