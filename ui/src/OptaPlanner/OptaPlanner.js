import React from "react";

import Solver from "./Solver";
import DispatchMechanics from "./DispatchMechanics";
import Simulation from "./Simulation";
import AddRemoveMechanic from "./AddRemoveMechanic";
import MechanicList from "./MechanicList";

import "./OptaPlanner.scss";

function OptaPlanner({socket, optaplanner, optaplannerConfig, optaplannerOptions}) {
  return (
    <div className="optaplanner section">
      <h1 className="title">OptaPlanner</h1>
      <Solver socket={socket} optaplanner={optaplanner}/>
      <DispatchMechanics socket={socket} optaplanner={optaplanner} optaplannerConfig={optaplannerConfig}/>
      <Simulation socket={socket} optaplanner={optaplanner}  optaplannerConfig={optaplannerConfig} optaplannerOptions={optaplannerOptions}/>
      <AddRemoveMechanic socket={socket} optaplanner={optaplanner}/>
      <MechanicList socket={socket} optaplanner={optaplanner}/>
    </div>
  );
}

export default OptaPlanner;
