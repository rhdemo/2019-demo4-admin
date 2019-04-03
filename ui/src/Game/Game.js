import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

import "./Game.scss";
import ShakeDemo from "./ShakeDemo";
import Motions from "./Motions";
import State from "./State";

function Game({socket, game}) {
  function resetGame() {
    socket.json({type: "reset"});
  }

  if (!game) {
    return (
      <section className="section">
        <h1 className="title">Game Configuration Not Found: Reset</h1>
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
      </section>
    );
  }

  return (
    <div className="game">
      <ShakeDemo socket={socket} game={game}/>
      <section className="section">
        <h1 className="title">Game: {game.state}</h1>
        <Motions socket={socket} game={game}/>
        <State socket={socket} game={game}/>
      </section>
    </div>
  );
}

export default Game;
