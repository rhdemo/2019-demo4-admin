import React from "react";

import GameStatus from "../common/GameStatus";
import State from "../Game/State";
import Solver from "./Solver";
import DispatchMechanics from "./DispatchMechanics";
import Simulation from "./Simulation";
import Mechanics from "./Mechanics";
import Dashboard from "../Game/Dashboard";

import "./OptaPlanner.scss";

function OptaPlanner({socket, password, game, stats, optaplanner, optaplannerConfig, optaplannerOptions}) {
  return (
    <div className="optaplanner">
      <div className="subsection">
        <GameStatus game={game} stats={stats}/>
        <State socket={socket} password={password} game={game}/>
      </div>
      <h1 className="title">OptaPlanner</h1>
      <Solver socket={socket} password={password} optaplanner={optaplanner}/>
      <DispatchMechanics socket={socket} password={password} optaplanner={optaplanner} optaplannerConfig={optaplannerConfig}/>
      <Mechanics socket={socket} password={password} optaplanner={optaplanner}/>
      <div className="subsection">
        <Dashboard socket={socket} password={password} game={game}/>
      </div>
      <Simulation socket={socket} password={password} optaplanner={optaplanner}  optaplannerConfig={optaplannerConfig} optaplannerOptions={optaplannerOptions}/>
    </div>
  );
}

export default OptaPlanner;
