import React from "react";

function Dashboard({socket, game}) {
  function toggleTransparency() {
    const dashboardTransparent = !game.dashboardTransparent;
    socket.json({type: "game", game: {dashboardTransparent}});
  }

  return (
    <div className="dashboard-settings">
      <h3 className="subtitle">Dashboard</h3>
      <form className="dashboard-inputs">
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input
                name="scalingEnabled"
                type="checkbox"
                checked={game.dashboardTransparent}
                onChange={toggleTransparency}/> Transparent Dashboard
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Dashboard;
