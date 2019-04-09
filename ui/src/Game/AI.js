import React from "react";

function AI({socket, game}) {
  function toggleAI() {
    const bypassAI = !game.bypassAI;
    socket.json({type: "game", game: {...game, bypassAI}});
  }

  return (
    <form className="ai-settings">
      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              name="scalingEnabled"
              type="checkbox"
              checked={game.bypassAI}
              onChange={toggleAI}/> Bypass AI Services
          </label>
        </div>
      </div>
    </form>
  );
}

export default AI;
