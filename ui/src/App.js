import React, { useState, useReducer} from "react";
import Sockette from "sockette";
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExclamationTriangle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import ShakeDemo from "./ShakeDemo/ShakeDemo";
import Game from "./Game/Game";
import MachineList from "./Machine/MachineList";
import OptaPlanner from "./OptaPlanner/OptaPlanner";

import "./App.scss";

const initialState = {
  loading: true,
  validated: null,
  connection: "loading",
  machines: {},
  stats: {},
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
    case "password":
      return {
        ...state,
        password: action.password
      };
    case "connection":
      return {
        ...state,
        connection: action.connection
      };
    case "ws_message":
      return processMessage(state, action.message);
    default:
      console.warn("Unhandled reducer action", action);
      return state;
  }
}

function processMessage(state, message) {
  const {type, data} = message;
  let value = {};

  switch (type) {
    case "error":
      value.error = data;
      break;
    case "validated":
      value.validated = data;
      if (value.validated) {
        value.error = false;
      }
      break;
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

const NAV_CHOICES = {
  SHAKE: "shake",
  OPTAPLANNER: "optaplanner",
  GAME: "game",
  DEBUG: "debug"
};

function App() {
  const protocol = window.location.protocol.includes('https') ? 'wss' : 'ws';
  const socketUrl = `${protocol}://${window.location.host}/admin-socket`;

  const [socket] = useState(connect);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [navSelection, updateNavSelection] = useState(NAV_CHOICES.SHAKE);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordField, setPasswordField] = useState("");

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

  function onPasswordSubmit(e) {
    e.preventDefault();

    const password = passwordField;
    dispatch({
      type: "password",
      password
    });

    socket.json({
      password,
      type: "init"
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

  function renderPasswordField() {
    let type, icon;
    if (showPassword) {
      type = "text";
      icon = faEyeSlash;
    } else {
      type = "password";
      icon = faEye;
    }

    return (
      <section className="section">
        <form className="password-inputs" onSubmit={onPasswordSubmit}>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input password"
                type={type}
                value={passwordField}
                onChange={e => setPasswordField(e.target.value)}
              />
              <button
                className="button hide-border"
                type="button"
                onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={icon}/>
              </button>
            </div>
          </div>
          <button
            className="button is-primary"
            type="submit">
            Submit
          </button>
        </form>
      </section>
    );
  }

  function renderError() {
    if (state.error) {
      return (
        <section className="section">
          <div className="notification is-danger">
            <h3 className="subtitle"><FontAwesomeIcon icon={faExclamationTriangle}/> Error</h3>
            <p>{state.error.code}: {state.error.message}</p>
          </div>
        </section>);
    }
  }

  function renderNavbar() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className={classNames("navbar-item", {"is-active": navSelection === NAV_CHOICES.SHAKE})}
             onClick={() => updateNavSelection(NAV_CHOICES.SHAKE)}>
            Shake
          </a>
          <a className={classNames("navbar-item", {"is-active": navSelection === NAV_CHOICES.OPTAPLANNER})}
             onClick={() => updateNavSelection(NAV_CHOICES.OPTAPLANNER)}>
            OptaPlanner
          </a>
          <a className={classNames("navbar-item", {"is-active": navSelection === NAV_CHOICES.GAME})}
             onClick={() => updateNavSelection(NAV_CHOICES.GAME)}>
            Game
          </a>
          <a className={classNames("navbar-item", {"is-active": navSelection === NAV_CHOICES.DEBUG})}
             onClick={() => updateNavSelection(NAV_CHOICES.DEBUG)}>
            Debug
          </a>
        </div>
      </nav>
    )
  }

  function renderMain() {
    if (state.loading) {
      return (
        <div>
          <h1 className="title"><FontAwesomeIcon icon={faSpinner} spin={true}/> Loading...</h1>
        </div>
      );
    }


    if (navSelection === NAV_CHOICES.SHAKE) {
      return (
        <section className="section">
          <ShakeDemo socket={socket} password={state.password} game={state.game}/>
        </section>
      );
    }

    if ((navSelection === NAV_CHOICES.OPTAPLANNER) ) {
      return (
        <section className="section">
          <div className="columns is-desktop">
            <div className="column">
              <OptaPlanner socket={socket} password={state.password}
                           game={state.game}
                           stats={state.stats}
                           optaplanner={state.optaplanner}
                           optaplannerConfig={state.optaplannerConfig}
                           optaplannerOptions={state.optaplannerOptions}/>
            </div>
            <div className="column">
              <MachineList socket={socket} password={state.password} game={state.game} machines={state.machines}/>
            </div>
          </div>
        </section>
      );
    }

    if ((navSelection === NAV_CHOICES.DEBUG)) {
      return (
        <section className="section">
          <pre>
            {JSON.stringify(state, null, 2)}
          </pre>
        </section>
      );
    }

    return (
      <section className="section">
        <div className="columns is-8 is-desktop">
          <div className="column">
            <Game socket={socket} password={state.password} game={state.game} stats={state.stats}/>
          </div>
          <div className="column">
            <MachineList socket={socket} password={state.password} game={state.game} machines={state.machines}/>
          </div>
        </div>
      </section>
    );
  }

  if (!state.validated) {
    return (
        <div className="app">
          {renderConnectionBar()}
          {renderPasswordField()}
          {renderError()}
        </div>
    );
  }

  return (
      <div className="app">
        {renderConnectionBar()}
        {renderNavbar()}
        {renderMain()}
      </div>
  );
}

export default App;
