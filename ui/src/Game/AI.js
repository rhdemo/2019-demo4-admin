import React from "react";

function AI({socket, game}) {
  function toggleAI() {
    const bypassAI = !game.bypassAI;
    socket.json({type: "game", game: {bypassAI}});
  }

  function update(motion, event) {
    const probability = parseFloat(event.target.value);
    if (isNaN(probability)) {
      return;
    }
    let ai = {...game.ai};
    ai[motion] = probability;
    socket.json({type: "game", game: {ai}});
  }


  if (!game || !game.ai) {
    return (
      <div className="ai-settings">
        <h1 className="title">AI Not Found</h1>
        <h3 className="subtitle">Reset Game</h3>
      </div>
    );
  }

  return (
    <div className="ai-settings">
      <h1 className="title">AI Min</h1>
      <form className="ai-inputs">
        {Object.entries(game.ai).map(([motion, probability]) => (
          <div key={motion} className="field">
            <label className="label">{motion}</label>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={probability}
                  onChange={(e) => update(motion, e)}
                />
              </div>
            </div>
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
    </div>
  );
}

export default AI;
