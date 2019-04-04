import React from "react";

import MechanicList from "./MechanicList";
import Simulation from "./Simulation";
import DispatchMechanics from "./DispatchMechanics";
import AddRemoveMechanic from "./AddRemoveMechanic";

import "./OptaPlanner.scss";

function OptaPlanner({socket, optaplanner}) {
  return (
    <div className="optaplanner section">
      <h1 className="title">OptaPlanner</h1>
      <DispatchMechanics socket={socket} optaplanner={optaplanner}/>
      <Simulation socket={socket} optaplanner={optaplanner}/>
      <AddRemoveMechanic socket={socket} optaplanner={optaplanner}/>
      <MechanicList socket={socket} optaplanner={optaplanner}/>
    </div>
  );
}

export default OptaPlanner;
