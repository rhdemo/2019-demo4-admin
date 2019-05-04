import React, { useState } from "react";
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop, faPlay, faCog} from "@fortawesome/free-solid-svg-icons";


function Simulation({socket, password, optaplanner, optaplannerConfig, optaplannerOptions}) {
  const damageOptions = optaplannerOptions ? optaplannerOptions.simulationDamageTypes : ["ERROR"];
  const [totalDamagePerSecond, setTotalDamagePerSecond] = useState(0.16);
  const [damageDistributionType, setDamageDistributionType] = useState("GAUSS");

  function stop() {
    socket.json({password, type: "optaplanner", action: "stop"});
  }

  function start() {
    socket.json({password, type: "optaplanner", action: "start", data: {totalDamagePerSecond, damageDistributionType}});
  }

  function getStatus() {
    if (!optaplannerConfig) {
      return <span className="tag is-medium is-danger">???</span>;
    }

    if (optaplannerConfig.simulationActive) {
      return <span className="tag is-medium is-warning"><FontAwesomeIcon icon={faCog} spin={true}/> Running</span>;
    } else {
      return <span className="tag is-medium">Stopped</span>;
    }
  }

  return (
    <div className="simulation subsection">
      <h3 className="subtitle">Simulation: {getStatus()}</h3>
      <form className="simulation-inputs">
        <div className="field">
          <label className="label">DPS</label>
          <div className="control">
            <input
              className="input simulation-dps-input"
              type="number"
              value={totalDamagePerSecond}
              onChange={(e) => setTotalDamagePerSecond(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Distribution</label>
          <div className="control">
            <div className="select">
              <select value={damageDistributionType} onChange={(e) => setDamageDistributionType(e.target.value)}>
                {damageOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>))}
              </select>
            </div>
          </div>
        </div>
      </form>
      <div className="horizontal-button-container">
          <button
            className={classNames('button', {"is-danger": optaplannerConfig && optaplannerConfig.simulationActive})}
            type="button"
            onClick={() => {
              stop();
            }}>
            <FontAwesomeIcon icon={faStop}/> Stop
          </button>
          <button
            className={classNames('button', {"is-info": optaplannerConfig && !optaplannerConfig.simulationActive})}
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
