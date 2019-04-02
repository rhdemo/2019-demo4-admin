import React  from "react";

import "./MachineList.scss";

function getMachineList(machines) {
  let arr = [];
  for (let key in machines) {
    let machine = machines[key];
    let intId = machine.id.match(/\d+/g) - 1;
    arr[intId] = machine;
  }
  return arr
}

function MachineList({socket, machines}) {
  if (!machines) {
    return null;
  }

  const machineArr = getMachineList(machines);

  return (
    <div className="machine-list section">
      <h1 className="title">Machines</h1>
      <table className="table">
        <thead>
        <tr>
          <th>Num</th>
          <th>Key</th>
          <th>Health</th>
        </tr>
        </thead>
        <tbody>
        {machineArr.map((machine, index) => <tr key={index}><td>{index}</td><td>{machine.id}</td><td>{machine.value}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default MachineList;
