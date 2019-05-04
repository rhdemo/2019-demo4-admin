import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";


function Solver({socket, password, optaplanner, optaPlannerConfig}) {

  function reset() {
    socket.json({password, type: "optaplanner", action: "reset"});
  }

  function setup() {
    socket.json({password, type: "optaplanner", action: "setupStage"});
  }


  return (
    <div className="solver subsection">
      <div className="horizontal-button-container">
        <div>
          <h3 className="subtitle">Solver</h3>
        </div>
        <button
          className="button"
          type="button"
          onClick={() => {
            reset();
          }}>
          <FontAwesomeIcon icon={faUndo}/> Reset
        </button>
        <button
          className="button is-"
          type="button"
          onClick={() => {
            setup();
          }}>
          <FontAwesomeIcon icon={faProjectDiagram}/> Setup Stage
        </button>
      </div>
    </div>
  );
}

export default Solver;
