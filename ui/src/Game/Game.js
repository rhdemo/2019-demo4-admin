import React, { useState } from "react";
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

import "./Game.scss";
import GameStatus from "../common/GameStatus";
import AI from "./AI";
import Motions from "./Motions";
import State from "./State";
import Scoring from "./Scoring";
import Damage from "./Damage";
import Dashboard from "./Dashboard";


const TAB_CHOICES = {
  DAMAGE: "damage",
  SCORING: "scoring",
  AI: "ai",
  DASHBOARD: "dashboard"
};


function Game({socket, game, stats}) {
  const [tab, updateTab] = useState(TAB_CHOICES.DAMAGE);

  function resetGame() {
    socket.json({type: "reset-game"});
  }

  function resetAll() {
    socket.json({type: "reset"});
  }

  function renderSettings() {
    switch (tab) {
      case TAB_CHOICES.AI:
        return <AI socket={socket} game={game}/>;
      case TAB_CHOICES.SCORING:
        return <Scoring socket={socket} game={game}/>;
      case TAB_CHOICES.DASHBOARD:
        return <Dashboard socket={socket} game={game}/>;
      default:
        return <Damage socket={socket} game={game}/>;
    }
  }

  if (!game) {
    return (
      <section className="section">
        <h1 className="title">Game Configuration Not Found: Reset Required</h1>
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
      <div className="gameplay is-half-tablet">
        <GameStatus game={game} stats={stats}/>
        <Motions socket={socket} game={game}/>
        <State socket={socket} game={game}/>
        <button
          className="button is-danger"
          type="button"
          onClick={() => {
            resetAll();
          }}>
          <FontAwesomeIcon icon={faUndo}/> Reset All
        </button>
      </div>
      <div>
        <h1 className="title">Settings</h1>
        <div className="tabs is-boxed">
          <ul>
            <li className={classNames({"is-active": tab === TAB_CHOICES.DAMAGE})}>
              <a onClick={() => updateTab(TAB_CHOICES.DAMAGE)}>Damage</a>
            </li>
            <li className={classNames({"is-active": tab === TAB_CHOICES.SCORING})}>
              <a onClick={() => updateTab(TAB_CHOICES.SCORING)}>Scoring</a>
            </li>
            <li className={classNames({"is-active": tab === TAB_CHOICES.AI})}>
              <a onClick={() => updateTab(TAB_CHOICES.AI)}>AI</a>
            </li>
            <li className={classNames({"is-active": tab === TAB_CHOICES.DASHBOARD})}>
              <a onClick={() => updateTab(TAB_CHOICES.DASHBOARD)}>Dashboard</a>
            </li>
          </ul>
        </div>
        <div className="game-settings">
          {renderSettings()}
        </div>
      </div>
    </div>
  );
}

export default Game;
