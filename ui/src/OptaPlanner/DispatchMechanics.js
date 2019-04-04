import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, } from "@fortawesome/free-solid-svg-icons";


function DispatchMechanics({socket, optaplanner}) {

  function pause() {
    socket.json({type: "optaplanner", action: "pauze"});
  }

  function unpause() {
    socket.json({type: "optaplanner", action: "unpauze"});
  }

  return (
    <div className="dispatch-mechanics subsection">
      <h3 className="subtitle">Mechanic Dispatching</h3>
      <div className="columns">
        <div className="column">
          <button
            className="button"
            type="button"
            onClick={() => {
              pause();
            }}>
            <FontAwesomeIcon icon={faPause}/> Pauze
          </button>
        </div>
        <div className="column">
          <button
            className="button"
            type="button"
            onClick={() => {
              unpause();
            }}>
            <FontAwesomeIcon icon={faPlay}/> UnPauze
          </button>
        </div>

      </div>
    </div>
  );
}

export default DispatchMechanics;
