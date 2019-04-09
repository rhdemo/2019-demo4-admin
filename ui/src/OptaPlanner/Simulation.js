import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop, faPlay, } from "@fortawesome/free-solid-svg-icons";


function Simulation({socket, optaplanner, optaplannerConfig}) {

  function stop() {
    socket.json({type: "optaplanner", action: "stop"});
  }

  function start() {
    socket.json({type: "optaplanner", action: "start"});
  }

  function getStatus() {
    if (!optaplannerConfig) {
      return <span className="tag is-medium is-warning">???</span>;
    }

    if (optaplannerConfig.simulationActive) {
      return <span className="tag is-medium is-success">Started</span>;
    } else {
      return <span className="tag is-medium">Stopped</span>;
    }
  }

  return (
    <div className="simulation subsection">
      <h3 className="subtitle">Simulation: {getStatus()}</h3>
      <div className="horizontal-button-container">
          <button
            className="button"
            type="button"
            onClick={() => {
              stop();
            }}>
            <FontAwesomeIcon icon={faStop}/> Stop
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              start();
            }}>
            <FontAwesomeIcon icon={faPlay}/> Start
          </button>
      </div>
    </div>
  );
}

export default Simulation;
