import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import SavingEditField from "../common/SavingEditField";

function Scoring({socket, password, game}) {
  function reset() {
    socket.json({password, type: "reset-scoring"});
  }

  function update(motion, value) {
    const score = parseInt(value);
    if (isNaN(score)) {
      return;
    }
    let scoring = {...game.scoring};
    scoring[motion] = score;
    socket.json({password, type: "game", game: {scoring}});
  }


  if (!game || !game.scoring) {
    return (
      <div className="scoring">
        <h1 className="title">Scoring Not Found</h1>
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
      <div className="scoring">
        <h3 className="subtitle">Scoring</h3>
        <form className="scoring-inputs">
          {Object.entries(game.scoring).map(([motion, score]) => (
            <div key={motion} className="field">
              <label className="label">{motion}</label>
              <SavingEditField
                type="number"
                value={score}
                onChange={value => update(motion, value)}
              />
            </div>
          ))}
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

export default Scoring;
