import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import SavingEditField from "../common/SavingEditField";

function Damage({socket, password, game}) {
  function reset() {
    socket.json({password, type: "reset-damage"});
  }

  function updateDamage(motion, value) {
    const amount = parseFloat(value);
    if (isNaN(amount)) {
      return;
    }
    let damage = {...game.damage};
    damage[motion] = amount;
    socket.json({password, type: "game", game: {damage}});
  }


  function updateMultiplier(value) {
    const damageMultiplier = parseFloat(value);
    if (isNaN(damageMultiplier)) {
      return;
    }
    socket.json({password, type: "game", game: {damageMultiplier}});
  }



  if (!game || !game.damage) {
    return (
      <div className="damage">
        <h1 className="title">Damage Not Found</h1>
        <h3 className="subtitle">Reset</h3>
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
        <h3 className="subtitle">Damage</h3>
        <form className="damage-inputs">
          <div className="field">
            <label className="label">Damage Multiplier</label>
            <SavingEditField
              type="number"
              value={game.damageMultiplier}
              onSave={updateMultiplier}/>
          </div>
          <hr />
          {Object.entries(game.damage).map(([motion, damage]) => (
            <div key={motion} className="field">
              <label className="label">{motion}</label>
              <div className="control">
                <SavingEditField
                  type="number"
                  value={damage}
                  onSave={value => updateDamage(motion, value)}
                />
              </div>
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

export default Damage;
