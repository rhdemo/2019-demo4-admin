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
      <div className="horizontal-button-container">
        <div>
          <h3 className="subtitle">Mechanic Dispatching</h3>
        </div>
        <button
          className="button"
          type="button"
          onClick={() => {
            pause();
          }}>
          <FontAwesomeIcon icon={faPause}/> Pauze
        </button>
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
  );
}

export default DispatchMechanics;
