import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./MachineList.scss";

const MAX_HEALTH = 1000000000000000000;

const MACHINE_VIZ = [
  {label: "A", style: {color: "#363636", backgroundColor: "#F4F256"}},
  {label: "B", style: {color: "#363636", backgroundColor: "#67F34F"}},
  {label: "C", style: {color: "white", backgroundColor: "#8835CB"}},
  {label: "D", style: {color: "white", backgroundColor: "#E549E0"}},
  {label: "E", style: {color: "white", backgroundColor: "#404D4E"}},
  {label: "F", style: {color: "white", backgroundColor: "#FB2F35"}},
  {label: "G", style: {color: "white", backgroundColor: "#32BBE5"}},
  {label: "H", style: {color: "white", backgroundColor: "#32DDD9"}},
  {label: "I", style: {color: "white", backgroundColor: "#E67B49"}},
  {label: "J", style: {color: "white", backgroundColor: "#E55353"}}
];

function getMachineList(machines) {
  let arr = [];
  for (let key in machines) {
    const machine = {...machines[key]};
    const machineId = parseInt(machine.id.match(/\d+/g)[0]);
    const arrayIndex = machineId - 1;

    machine.intId = machineId;
    machine.optaplannerId = arrayIndex;
    machine.health = ((machine.value / MAX_HEALTH) * 100).toFixed(2) + "%";
    machine.label = MACHINE_VIZ[arrayIndex].label;
    machine.style = MACHINE_VIZ[arrayIndex].style;
    arr[arrayIndex] = machine;
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
          {/*<th>Key</th>*/}
          <th>Label</th>
          <th>Health</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {machineArr.map((machine) => (
          <tr key={machine.id}>
            {/*<td>{machine.id}</td>*/}
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
