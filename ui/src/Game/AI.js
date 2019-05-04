import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import SavingEditField from "../common/SavingEditField";

function AI({socket, password, game}) {
  function reset() {
    socket.json({password, type: "reset-ai"});
  }

  function toggleAI() {
    const bypassAI = !game.bypassAI;
    socket.json({password, type: "game", game: {bypassAI}});
  }

  function update(motion, value) {
    const probability = parseFloat(value);
    if (isNaN(probability)) {
      return;
    }
    let ai = {...game.ai};
    ai[motion] = probability;
    socket.json({password, type: "game", game: {ai}});
  }


  if (!game || !game.ai) {
    return (
      <div className="ai-settings">
        <h1 className="title">AI Not Found</h1>
        <h3 className="subtitle">Reset Game</h3>
        <button
          className="button"
          type="button"
          onClick={() => {
            reset();
          }}>
          <FontAwesomeIcon icon={faUndo}/>
        </button>
      </div>
    );
  }

  return (
    <div className="ai-settings">
      <h3 className="subtitle">AI</h3>
      <form className="ai-inputs">
        {Object.entries(game.ai).map(([motion, probability]) => (
          <div key={motion} className="field">
            <label className="label">{motion}</label>
            <SavingEditField
              type="number"
              value={probability}
              onSave={value => update(motion, value)}
            />
          </div>
        ))}
      </form>
      <form className="ai-bypass-inputs">
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input
                name="scalingEnabled"
                type="checkbox"
                checked={game.bypassAI}
                onChange={toggleAI}/> Bypass AI
            </label>
          </div>
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
  );
}

export default AI;
