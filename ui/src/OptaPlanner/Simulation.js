import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop, faPlay, } from "@fortawesome/free-solid-svg-icons";


function Simulation({socket, optaplanner}) {

  function stop() {
    socket.json({type: "optaplanner", action: "stop"});
  }

  function start() {
    socket.json({type: "optaplanner", action: "start"});
  }

  return (
    <div className="simulation subsection">
      <h3 className="subtitle">Simulation</h3>
      <div className="columns">
        <div className="column">
          <button
            className="button"
            type="button"
            onClick={() => {
              stop();
            }}>
            <FontAwesomeIcon icon={faStop}/> Stop
          </button>
        </div>
        <div className="column">
          <button
            className="button"
            type="button"
            onClick={() => {
              start();
            }}>
            <FontAwesomeIcon icon={faPlay}/> Play
          </button>
        </div>

      </div>
    </div>
  );
}

export default Simulation;
