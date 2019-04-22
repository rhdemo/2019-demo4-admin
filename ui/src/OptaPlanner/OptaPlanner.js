import React from "react";

import GameStatus from "../common/GameStatus";
import State from "../Game/State";
import Solver from "./Solver";
import DispatchMechanics from "./DispatchMechanics";
import Simulation from "./Simulation";
import Mechanics from "./Mechanics";

import "./OptaPlanner.scss";

function OptaPlanner({socket, game, stats, optaplanner, optaplannerConfig, optaplannerOptions}) {
  return (
    <div className="optaplanner">
      <div className="subsection">
        <GameStatus game={game} stats={stats}/>
        <State socket={socket} game={game}/>
      </div>
      <h1 className="title">OptaPlanner</h1>
      <Solver socket={socket} optaplanner={optaplanner}/>
      <DispatchMechanics socket={socket} optaplanner={optaplanner} optaplannerConfig={optaplannerConfig}/>
      <Mechanics socket={socket} optaplanner={optaplanner}/>
      <Simulation socket={socket} optaplanner={optaplanner}  optaplannerConfig={optaplannerConfig} optaplannerOptions={optaplannerOptions}/>
    </div>
  );
}

export default OptaPlanner;
