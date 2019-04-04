import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, } from "@fortawesome/free-solid-svg-icons";


function AddRemoveMechanic({socket, optaplanner}) {

  function remove() {
    socket.json({type: "optaplanner", method: "POST", path: "/app/removeMechanic"});
  }

  function add() {
    socket.json({type: "optaplanner", method: "POST", path: "/app/addMechanic"});
  }

  return (
    <div className="add-remove-mechanic subsection">
      <h3 className="subtitle">Mechanics</h3>
      <div className="columns">
        <div className="column">
          <button
            className="button"
            type="button"
            onClick={() => {
              remove();
            }}>
            <FontAwesomeIcon icon={faMinus}/> Remove
          </button>
        </div>
        <div className="column">
          <button
            className="button"
            type="button"
            onClick={() => {
              add();
            }}>
            <FontAwesomeIcon icon={faPlus}/> Add
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddRemoveMechanic;
