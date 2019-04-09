import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";


function Solver({socket, optaplanner, optaPlannerConfig}) {

  function reset() {
    socket.json({type: "optaplanner", action: "reset"});
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
      </div>
    </div>
  );
}

export default Solver;
