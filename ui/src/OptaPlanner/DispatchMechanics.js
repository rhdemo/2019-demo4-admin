import React from "react";
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faCog} from "@fortawesome/free-solid-svg-icons";


function DispatchMechanics({socket, password, optaplanner, optaplannerConfig}) {

  function pause() {
    socket.json({password, type: "optaplanner", action: "pauze"});
  }

  function unpause() {
    socket.json({password, type: "optaplanner", action: "unpauze"});
  }

  function getStatus() {
    if (!optaplannerConfig) {
      return <span className="tag is-medium is-danger">???</span>;
    }

    if (optaplannerConfig.dispatchActive) {
      return <span className="tag is-medium is-warning"><FontAwesomeIcon icon={faCog} spin={true}/> Active</span>;
    } else {
      return <span className="tag is-medium">Pauzed</span>;
    }
  }

  return (
    <div className="dispatch-mechanics subsection">
      <div className="horizontal-button-container">
        <div>
          <h3 className="subtitle">Mechanic Dispatching: {getStatus()}</h3>
        </div>
        <button
          className={classNames('button', {"is-danger": optaplannerConfig && optaplannerConfig.dispatchActive})}
          type="button"
          onClick={() => {
            pause();
          }}>
          <FontAwesomeIcon icon={faPause}/> Pauze
        </button>
        <button
          className={classNames('button', {"is-info": optaplannerConfig && !optaplannerConfig.dispatchActive})}
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
