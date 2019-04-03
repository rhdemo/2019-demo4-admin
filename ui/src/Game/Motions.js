import React from "react";

const MOTIONS = {
  SHAKE: "shake",
  CIRCLE: "circle",
  X: "x",
  ROLL: "roll",
  FEVER: "fever",
  FLOSS: "floss",
};

function Game({socket, game}) {
  function toggleMotion(motion) {
    const motions = {...game.motions};
    motions[motion] = !motions[motion];
    socket.json({type: "game", game: {...game, motions: motions}});
  }

  if (!game || !game.motions) {
    return (
      <section className="section">
        <h1 className="title">Motions Config Not Found: Reset Required</h1>
      </section>
    );
  }

  return (
      <form className="enable-motions">
        <div className="columns">
          {Object.values(MOTIONS).map(motion => (
            <div key={motion} className="field column">
              <div className="control">
                <label className="checkbox">
                  <input
                    name={motion + "Enabled"}
                    type="checkbox"
                    checked={game.motions[motion]}
                    onChange={() => toggleMotion(motion)}/> {motion}
                </label>
              </div>
            </div>
          ))}
        </div>
      </form>
  );
}

export default Game;
