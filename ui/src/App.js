import React, { useState, useReducer} from "react";
import Sockette from "sockette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Game from "./Game/Game";
import MachineList from "./Machine/MachineList";
import OptaPlanner from "./OptaPlanner/OptaPlanner";

import "./App.scss";

const initialState = {
  loading: true,
  connection: "loading",
  machines: {},
  optaplannerOptions: {
    simulationDamageTypes: [
      "UNIFORM",
      "GAUSS",
      "DOUBLE_DISTRIBUTION_ON_MACHINE_D_AND_I"
    ]
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "connection":
      return {
        ...state,
        connection: action.connection
      };
    case "ws_message":
      return processMessage(state, action.message);
    default:
      console.warn("Unhandled reducer action", action);
  }
}

function processMessage(state, message) {
  const {type, data} = message;
  let value = {};

  switch (type) {
    case "heartbeat":
      value.heartbeat = new Date();
      break;
    case "machine":
      let machines = state.machines || {};
      machines[data.id] = data;
      value = {machines};
      break;
    case "optaplanner":
      let optaplanner = state.optaplanner || {};
      optaplanner[data.key] = data.value;
      value = {optaplanner};
      break;
    default:
      value[type] = data;
      break;
  }
  return {...state, ...value, loading: false, connection: "connected"};
}

function App() {
  const socketUrl = `ws://${window.location.host}/admin-socket`;

  const [socket] = useState(connect);
  const [state, dispatch] = useReducer(reducer, initialState);

  function connect() {
    return new Sockette(socketUrl, {
      timeout: 2000,
      onopen: onWsOpen,
      onmessage: onWsMessage,
      onreconnect: onWsOpen,
      onmaximum: onWsMaximum,
      onclose: onWsClosed,
      onerror: e => console.error("Error:", e)
    });
  }

  function onWsOpen(event) {
    console.log("Websocket connected");
    dispatch({
      type: "connection",
      connection: "connecting"
    });

    socket.json({
      type: "init"
    });
  }

  function onWsMessage(e) {
    const json = JSON.parse(e.data);
    dispatch({
      type: "ws_message",
      message: json
    });
  }

  function onWsClosed(event) {
    dispatch({
      type: "connection",
      connection: "disconnected"
    });
  }

  function onWsMaximum(event) {
    dispatch({
      type: "connection",
      connection: "lost"
    });
  }

  function renderConnectionBar() {
    return (
      <nav className={"connection-status level " + state.connection}>
        <div className="level-left">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">{socketUrl}: {state.connection}</p>
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Last Heartbeat: {JSON.stringify(state.heartbeat)}</p>
            </div>
          </div>
        </div>
      </nav>);
  }

  function renderMain() {
    if (state.loading) {
      return (
        <div>
          <h1 className="title"><FontAwesomeIcon icon={faSpinner} spin={true}/> Loading...</h1>
        </div>
      );
    }

    return (
      <div>
        <Game socket={socket} game={state.game} test={"hello"}/>
        <div className="columns is-desktop">
          <div className="column">
            <MachineList socket={socket} machines={state.machines}/>
          </div>
          <div className="column">
            <OptaPlanner socket={socket}
                         optaplanner={state.optaplanner}
                         optaplannerConfig={state.optaplannerConfig}
                         optaplannerOptions={state.optaplannerOptions}/>
          </div>
        </div>

      </div>
    )
  }

  return (
    <div className="app">
      {renderConnectionBar()}
      {renderMain()}
      {/*<pre>*/}
        {/*{JSON.stringify(state, null, 2)}*/}
      {/*</pre>*/}
    </div>
  );
}

export default App;
