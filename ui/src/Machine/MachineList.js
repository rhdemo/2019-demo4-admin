import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import getMachineViz from "../common/getMachineViz"
import SavingEditField from "../common/SavingEditField";
import "./MachineList.scss";

const MAX_HEALTH = 1000000000000000000;

function getMachineList(machines) {
  let machineList = [];
  let minMachine = {label: "???", health: 101};
  let healthSum = 0;
  let numMachines = 0;

  for (let key in machines) {
    const machine = {...machines[key]};
    const machineId = parseInt(machine.id.match(/\d+/g)[0]);

    machine.intId = machineId;
    machine.optaplannerId = machineId;
    machine.health = ((machine.value / MAX_HEALTH) * 100);
    machine.label = getMachineViz(machineId).label;
    machine.style = getMachineViz(machineId).style;
    machineList[machineId] = machine;

    healthSum += machine.health;
    numMachines += 1;

    if (machine.health < minMachine.health) {
      minMachine = machine;
    }
  }

  const averageHealth = numMachines ? healthSum / numMachines : NaN;

  return {machineList, minMachine, averageHealth};
}

function getDamageClass(machine) {
  if (machine.health < 50) {
    return "broken"
  }

  if (machine.health < 80) {
    return "damaged";
  }

  return "healthy";
}

function MachineList({socket, password, game, machines}) {
  function reset() {
    socket.json({password, type: "reset-machines"});
  }

  function updateDamageMultiplier(value) {
    const damageMultiplier = parseFloat(value);
    if (isNaN(damageMultiplier)) {
      return;
    }
    socket.json({password, type: "game", game: {damageMultiplier}});
  }

  function incrementDamageMultiplier(changeStr) {
    const change = parseFloat(changeStr);
    // I hate floats
    let newValue = Math.round(game.damageMultiplier * 1000 + change * 1000) / 1000;
    updateDamageMultiplier(newValue);
  }

  function damageMachine(machine, damagePercent) {
    const machineIndex = machine.optaplannerId;
    const amount = damagePercent / 100;
    socket.json({password, type: "optaplanner", action: "damage", data: {machineIndex, amount}});
  }

  function healMachine(machine) {
    const machineIndex = machine.optaplannerId;
    socket.json({password, type: "optaplanner", action: "heal", data: {machineIndex}});
  }

  if (!machines) {
    return (
      <div className="machine-list section">
        <h1 className="title">Machines Not Found</h1>
      </div>
    );
  }

  const {machineList, minMachine, averageHealth} = getMachineList(machines);

  return (
    <div className="machine-list">
      <h1 className="title">Machines</h1>
      <div className="damage-multiplier">
        <div className="field">
          <label className="label">Damage Multiplier</label>
          <SavingEditField
            type="number"
            value={game.damageMultiplier}
            onSave={updateDamageMultiplier}/>
        </div>
        <div className="button-bar">
          <button
            className="button"
            type="button"
            onClick={() => {
              incrementDamageMultiplier(-0.1);
            }}>-0.1
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              incrementDamageMultiplier(-0.01);
            }}>-0.01
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              incrementDamageMultiplier(-0.001);
            }}>-0.001
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              incrementDamageMultiplier(0.001);
            }}>+0.001
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              incrementDamageMultiplier(0.01);
            }}>+0.01
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              incrementDamageMultiplier(0.1);
            }}>+0.1
          </button>
        </div>
      </div>
      <div className="machine-stats">
        <h3>Min Health: {minMachine.health.toFixed(2)}% ({minMachine.label})</h3>
        <h3>Avg Health: {averageHealth.toFixed(2)}%</h3>
      </div>
      <table className="table machine-list-table">
        <thead>
        <tr>
          <th></th>
          <th>Label</th>
          <th className="health-column">Health</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {machineList.map((machine, index) => (
          <tr key={machine.id} className={machine.id === minMachine.id ? "is-highlighted": ""}>
            <td>{index}</td>
            <td className="machine-stats">
              <div className="machine-label" style={machine.style}>{machine.label}</div>
            </td>
            <td className={getDamageClass(machine)}>{machine.health.toFixed(2)}%</td>
            <td className="button-bar">
              <button
                className="button"
                type="button"
                onClick={() => {
                  damageMachine(machine, 1);
                }}>-1
              </button>
              <button
                className="button"
                type="button"
                onClick={() => {
                  damageMachine(machine, 5);
                }}>-5
              </button>
              <button
                className="button is-danger"
                type="button"
                onClick={() => {
                  damageMachine(machine, 25);
                }}>-25
              </button>
              <button
                className="button is-success"
                type="button"
                onClick={() => {
                  healMachine(machine);
                }}><FontAwesomeIcon icon={faHeart}/>
              </button>
            </td>
          </tr>))}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <div className="machine-heal-all">
              <button
                className="button is-success"
                type="button"
                onClick={() => {
                  reset();
                }}><FontAwesomeIcon icon={faHeart}/> Heal All
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MachineList;
