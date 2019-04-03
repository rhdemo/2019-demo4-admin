import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStop, faPlay, faPause, faUndo } from "@fortawesome/free-solid-svg-icons";


const GAME_STATES = {
  LOBBY: "lobby",
  STOPPED: "stopped",
  PAUSED: "paused",
  LOADING: "loading",
  ACTIVE: "active",
};

function State({socket, game}) {

  function updateGameState(gameState) {
    socket.json({type: "game", game: {...game, state: gameState}});
  }

  function resetGame() {
    socket.json({type: "reset"});
  }

  if (!game) {
    return (
      <section className="section">
        <h1 className="title">Game: {game.state}</h1>
        <form className="enable-motions">
          <div className="columns">
            <button
              className="button"
              type="button"
              onClick={() => {
                resetGame();
              }}>
              <FontAwesomeIcon icon={faUndo}/> Reset
            </button>
          </div>
        </form>
      </section>
    );
  }

  return (
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
  );
}

export default State;
