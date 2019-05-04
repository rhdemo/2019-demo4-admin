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

function State({socket, password, game}) {

  function updateGameState(gameState) {
    socket.json({password, type: "game", game: {state: gameState}});
  }

  function resetGame() {
    socket.json({password, type: "reset-game"});
  }

  if (!game) {
    return (
      <section className="section">
        <h1 className="title">Game: {game.state}</h1>
        <button
          className="button"
          type="button"
          onClick={() => {
            resetGame();
          }}>
          <FontAwesomeIcon icon={faUndo}/> Reset
        </button>
      </section>
    );
  }

  return (
    <div className="game-state horizontal-button-container">
      <button
        className="button"
        type="button"
        onClick={() => {
          updateGameState(GAME_STATES.LOBBY);
        }}>
        <FontAwesomeIcon icon={faHome}/> Lobby
      </button>
      <button
        className="button"
        type="button"
        onClick={() => {
          updateGameState(GAME_STATES.STOPPED);
        }}>
        <FontAwesomeIcon icon={faStop}/> Stop
      </button>
      <button
        className="button"
        type="button"
        onClick={() => {
          updateGameState(GAME_STATES.PAUSED);
        }}>
        <FontAwesomeIcon icon={faPause}/> Pause
      </button>
      <button
        className="button"
        type="button"
        onClick={() => {
          updateGameState(GAME_STATES.ACTIVE);
        }}>
        <FontAwesomeIcon icon={faPlay}/> Play
      </button>
      <button
        className="button"
        type="button"
        onClick={() => {
          resetGame();
        }}>
        <FontAwesomeIcon icon={faUndo}/> Reset
      </button>
    </div>
  );
}

export default State;
