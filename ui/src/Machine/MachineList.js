import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import getMachineViz from "../common/getMachineViz"
import "./MachineList.scss";

const MAX_HEALTH = 1000000000000000000;

function getMachineList(machines) {
  let arr = [];
  for (let key in machines) {
    const machine = {...machines[key]};
    const machineId = parseInt(machine.id.match(/\d+/g)[0]);

    machine.intId = machineId;
    machine.optaplannerId = machineId;
    machine.health = ((machine.value / MAX_HEALTH) * 100).toFixed(2) + "%";
    machine.label = getMachineViz(machineId).label;
    machine.style = getMachineViz(machineId).style;
    arr[machineId] = machine;
  }
  return arr;
}

function MachineList({socket, machines}) {
  function damageMachine(machine, damagePercent) {
    const machineIndex = machine.optaplannerId;
    const amount = damagePercent / 100;
    socket.json({type: "optaplanner", action: "damage", data: {machineIndex, amount}});
  }

  function healMachine(machine) {
    const machineIndex = machine.optaplannerId;
    socket.json({type: "optaplanner", action: "heal", data: {machineIndex}});
  }

  if (!machines) {
    return (
      <div className="machine-list section">
        <h1 className="title">Machines Not Found</h1>
      </div>
    );
  }

  const machineArr = getMachineList(machines);

  return (
    <div className="machine-list section">
      <h1 className="title">Machines</h1>
      <table className="table">
        <thead>
        <tr>
          <th></th>
          <th>Label</th>
          <th className="health-column">Health</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {machineArr.map((machine, index) => (
          <tr key={machine.id}>
            <td>{index}</td>
            <td>
              <div className="machine-label" style={machine.style}>{machine.label}</div>
            </td>
            <td>{machine.health}</td>
            <td>
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
                }}><FontAwesomeIcon icon={faHeart}/></button>
            </td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default MachineList;
