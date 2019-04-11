import React from "react";

function Scoring({socket, game}) {
  function update(motion, event) {
    const score = parseInt(event.target.value);
    if (isNaN(score)) {
      return;
    }
    let scoring = {...game.scoring};
    scoring[motion] = score;
    socket.json({type: "game", game: {...game, scoring}});
  }


  if (!game || !game.scoring) {
    return (
      <div className="scoring">
        <h1 className="title">Scoring Not Found</h1>
        <h3 className="subtitle">Reset Game</h3>
      </div>
    );
  }

  return (
      <div className="scoring">
        <h1 className="title">Scoring</h1>
        <form className="scoring-inputs">
          {Object.entries(game.scoring).map(([motion, score]) => (
            <div key={motion} className="field">
              <label className="label">{motion}</label>
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    value={score}
                    onChange={(e) => update(motion, e)}
                  />
                </div>
              </div>
            </div>
          ))}
        </form>
      </div>
  );
}

export default Scoring;
