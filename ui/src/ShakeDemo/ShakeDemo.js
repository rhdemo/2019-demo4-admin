import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import SavingEditField from "../common/SavingEditField";

import "./ShakeDemo.scss";

function ShakeDemo({socket, password, game}) {
  function reset() {
    socket.json({password, type: "reset-shake-demo"});
  }

  function toggleShakeDemo() {
    const enabled = !game.shakeDemo.enabled;
    let shakeDemo = {...game.shakeDemo, enabled};
    socket.json({password, type: "game", game: {shakeDemo}});
  }

  function updateMultiplier(value) {
    const multiplier = parseFloat(value);
    if (isNaN(multiplier)) {
      return;
    }
    let shakeDemo = {...game.shakeDemo, multiplier};
    socket.json({password, type: "game", game: {shakeDemo}});
  }

  function updateMax(value) {
    const maxPerSecond = parseFloat(value);
    if (isNaN(maxPerSecond)) {
      return;
    }
    let shakeDemo = {...game.shakeDemo, maxPerSecond};
    socket.json({password, type: "game", game: {shakeDemo}});
  }

  if (!game || !game.shakeDemo) {
    return (
      <section className="section">
        <h1 className="title">Scaling Test Config Not Found: Reset Required</h1>
      </section>);
  }

  return (
    <div className="shake-demo columns">
      <div className="column is-half-tablet is-one-third-desktop">
        <h1 className="title">Hard Shake</h1>
        <form className="enable-scaling">
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  name="scalingEnabled"
                  type="checkbox"
                  checked={game.shakeDemo.enabled}
                  onChange={toggleShakeDemo}/> Enable Shake Demo
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">Message Multiplier</label>
            <SavingEditField
              type="number"
              value={game.shakeDemo.multiplier}
              onSave={updateMultiplier}/>
          </div>
          <div className="field">
            <label className="label">Message Maximum</label>
            <SavingEditField
              type="number"
              value={game.shakeDemo.maxPerSecond}
              onSave={updateMax}/>
          </div>
        </form>
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

export default ShakeDemo;
