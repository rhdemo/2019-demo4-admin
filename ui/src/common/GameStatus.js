import React  from "react";
import lodashGet from "lodash/get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog, faPause, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";

import "./GameStatus.scss";

function GameStatus({game, stats}) {
  function renderGameState() {
    switch (game.state) {
      case "lobby":
        return <span className="notification"><FontAwesomeIcon icon={faHome}/> Lobby</span>;
      case "stopped":
        return <span className="notification is-danger"><FontAwesomeIcon
          icon={faFlagCheckered}/> Stopped</span>;
      case "paused":
        return <span className="notification is-warning"><FontAwesomeIcon icon={faPause}/> Paused</span>;
      case "active":
        return <span className="notification is-success"><FontAwesomeIcon icon={faCog} spin={true}/> Active</span>;
      default:
        return <span className="notification is-black">{game.state || "???????"}</span>;
    }
  }

  return (
    <div className="game-status">
      <h1 className="title">Game: {renderGameState()}</h1>
      <h3 className="subtitle">Players: {lodashGet(stats, "players.currentNumberOfEntries")}</h3>
    </div>
  );
}

export default GameStatus;
