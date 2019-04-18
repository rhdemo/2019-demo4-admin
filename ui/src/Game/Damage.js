import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

function Damage({socket, game}) {
  function reset() {
    socket.json({type: "reset-damage"});
  }

  function updateDamage(motion, event) {
    const amount = parseFloat(event.target.value);
    if (isNaN(amount)) {
      return;
    }
    let damage = {...game.damage};
    damage[motion] = amount;
    socket.json({type: "game", game: {damage}});
  }


  function updateMultiplier(event) {
    const damageMultiplier = parseFloat(event.target.value);
    if (isNaN(damageMultiplier)) {
      return;
    }
    socket.json({type: "game", game: {damageMultiplier}});
  }



  if (!game || !game.damage) {
    return (
      <div className="damage">
        <h1 className="title">Damage Not Found</h1>
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
      <div className="damage">
        <div className="title-button-container">
          <h1 className="title">Damage</h1>
          <button
            className="button"
            type="button"
            onClick={() => {
              reset();
            }}>
            <FontAwesomeIcon icon={faUndo}/>
          </button>
        </div>
        <form className="damage-inputs">
          {Object.entries(game.damage).map(([motion, damage]) => (
            <div key={motion} className="field">
              <label className="label">{motion}</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={damage}
                  onChange={(e) => updateDamage(motion, e)}
                />
              </div>
            </div>
          ))}
          <div className="field">
            <label className="label">Damage Multiplier</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={game.damageMultiplier}
                onChange={(e) => updateMultiplier(e)}
              />
            </div>
          </div>
        </form>
      </div>
  );
}

export default Damage;
