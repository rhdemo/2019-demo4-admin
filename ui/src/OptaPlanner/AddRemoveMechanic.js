import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, } from "@fortawesome/free-solid-svg-icons";


function AddRemoveMechanic({socket, optaplanner}) {

  function remove() {
    socket.json({type: "optaplanner", action: "removeMechanic"});
  }

  function add() {
    socket.json({type: "optaplanner", action: "addMechanic"});
  }

  return (
    <div className="add-remove-mechanic subsection">
      <h3 className="subtitle">Mechanics</h3>
      <div className="horizontal-button-container">
        <button
          className="button"
          type="button"
          onClick={() => {
            remove();
          }}>
          <FontAwesomeIcon icon={faMinus}/> Remove
        </button>
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
  );
}

export default AddRemoveMechanic;
