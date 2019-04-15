import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop, faPlay, } from "@fortawesome/free-solid-svg-icons";


function Simulation({socket, optaplanner, optaplannerConfig, optaplannerOptions}) {
  const damageOptions = optaplannerOptions ? optaplannerOptions.simulationDamageTypes : ["ERROR"];
  const [totalDamagePerSecond, setTotalDamagePerSecond] = useState(0.2);
  const [damageDistributionType, setDamageDistributionType] = useState(damageOptions[0]);

  function stop() {
    socket.json({type: "optaplanner", action: "stop"});
  }

  function start() {
    socket.json({type: "optaplanner", action: "start", data: {totalDamagePerSecond, damageDistributionType}});
  }

  function getStatus() {
    if (!optaplannerConfig) {
      return <span className="tag is-medium is-warning">???</span>;
    }

    if (optaplannerConfig.simulationActive) {
      return <span className="tag is-medium is-success">Started</span>;
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
          <div className="field">
            <div className="control">
              <input
                className="input simulation-dps-input"
                type="number"
                value={totalDamagePerSecond}
                onChange={(e) => setTotalDamagePerSecond(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="field">
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
            className="button"
            type="button"
            onClick={() => {
              stop();
            }}>
            <FontAwesomeIcon icon={faStop}/> Stop
          </button>
          <button
            className="button"
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
