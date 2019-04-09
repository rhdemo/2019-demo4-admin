import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

import "./Game.scss";
import AI from "./AI";
import ShakeDemo from "./ShakeDemo";
import Motions from "./Motions";
import State from "./State";
import Scoring from "./Scoring";
import Damage from "./Damage";

function Game({socket, game}) {
  function resetGame() {
    socket.json({type: "reset"});
  }

  function getState() {
    switch (game.state) {
      case "lobby":
        return <span className="notification">Lobby</span>;
      case "stopped":
        return <span className="notification is-danger">Stopped</span>;
      case "paused":
        return <span className="notification is-warning">Paused</span>;
      case "active":
        return <span className="notification is-success">Active</span>;
      default:
        return <span className="notification is-black">{game.state}</span>
    }
  }

  if (!game) {
    return (
      <section className="section">
        <h1 className="title">Game Configuration Not Found: Reset</h1>
        <div className="horizontal-button-container">
          <button
            className="button"
            type="button"
            onClick={() => {
              resetGame();
            }}>
            <FontAwesomeIcon icon={faUndo}/> Reset
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="game">
      <ShakeDemo socket={socket} game={game}/>
      <section className="section">
        <div className="gameplay">
          <h1 className="title">Game: {getState()}</h1>
          <AI socket={socket} game={game}/>
          <Motions socket={socket} game={game}/>
          <State socket={socket} game={game}/>
        </div>
        <div className="columns settings">
          <div className="column setting is-half-tablet is-one-third-desktop">
            <Scoring socket={socket} game={game}/>
          </div>
          <div className="column setting is-half-tablet is-one-third-desktop">
            <Damage socket={socket} game={game}/>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Game;
