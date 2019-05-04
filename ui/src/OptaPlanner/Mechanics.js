import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, } from "@fortawesome/free-solid-svg-icons";
import MechanicList from "./MechanicList";


function Mechanics({socket, password, optaplanner}) {

  function remove() {
    socket.json({password, type: "optaplanner", action: "removeMechanic"});
  }

  function add() {
    socket.json({password, type: "optaplanner", action: "addMechanic"});
  }

  return (
    <div className="mechanics subsection">
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
      <MechanicList socket={socket} password={password} optaplanner={optaplanner}/>
    </div>
  );
}

export default Mechanics;
