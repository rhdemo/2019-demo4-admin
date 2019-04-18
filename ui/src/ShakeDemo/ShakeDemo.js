import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

function ShakeDemo({socket, game}) {
  function reset() {
    socket.json({type: "reset-shake-demo"});
  }

  function toggleShakeDemo() {
    const enabled = !game.shakeDemo.enabled;
    let shakeDemo = {...game.shakeDemo, enabled};
    socket.json({type: "game", game: {shakeDemo}});
  }

  function updateMultiplier(event) {
    const multiplier = parseFloat(event.target.value);
    if (isNaN(multiplier)) {
      return;
    }
    let shakeDemo = {...game.shakeDemo, multiplier};
    socket.json({type: "game", game: {shakeDemo}});
  }

  function updateMax(event) {
    const maxPerSecond = parseFloat(event.target.value);
    if (isNaN(maxPerSecond)) {
      return;
    }
    let shakeDemo = {...game.shakeDemo, maxPerSecond};
    socket.json({type: "game", game: {shakeDemo}});
  }

  if (!game || !game.shakeDemo) {
    return (
      <section className="section">
        <h1 className="title">Scaling Test Config Not Found: Reset Required</h1>
      </section>);
  }

  return (
      <section className="shake-demo section">
        <div className="columns">
          <div className="column is-half-tablet is-one-third-desktop">
            <div className="title-button-container">
              <h1 className="title">Scaling Test</h1>
              <button
                className="button"
                type="button"
                onClick={() => {
                  reset();
                }}>
                <FontAwesomeIcon icon={faUndo}/>
              </button>
            </div>
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
                <div className="field">
                  <input
                    className="input"
                    type="number"
                    value={game.shakeDemo.multiplier}
                    onChange={updateMultiplier}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Message Maximum</label>
                <div className="field">
                  <input
                    className="input"
                    type="number"
                    value={game.shakeDemo.maxPerSecond}
                    onChange={updateMax}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
  );
}

export default ShakeDemo;
