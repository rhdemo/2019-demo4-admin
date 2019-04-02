import React  from "react";

import "./MechanicList.scss";

function getMechanicList(optaplanner) {
  if (!optaplanner) {
    return [];
  }

  let arr = [];
  for (let key in optaplanner) {
    let value = optaplanner[key];
    if (!value || value.responseType !== "DISPATCH_MECHANIC") {
      continue;
    }
    let mechanic = {...value.mechanic};
    mechanic.key = key;
    mechanic.future = JSON.stringify(mechanic.futureMachineIndexes);
    arr.push(mechanic);
  }
  arr.sort((a, b) => a.mechanicIndex - b.mechanicIndex);
  return arr
}

function MechanicList({socket, optaplanner}) {
  const mechanicArray = getMechanicList(optaplanner);

  return (
    <div className="mechanic-list section">
      <h1 className="title">Mechanics</h1>
      <table className="table">
        <thead>
        <tr>
          <th>Index</th>
          <th>Key</th>
          <th>Original Machine</th>
          <th>Focus Machine</th>
          <th>Focus Travel</th>
          <th>Focus Fix Time</th>
          <th>Future</th>
        </tr>
        </thead>
        <tbody>
        {mechanicArray.map((mechanic, index) => (
          <tr key={mechanic.mechanicIndex}>
            <td>{mechanic.mechanicIndex}</td>
            <td>{mechanic.key}</td>
            <td>{mechanic.originalMachineIndex}</td>
            <td>{mechanic.focusMachineIndex}</td>
            <td>{mechanic.focusTravelTimeMillis}</td>
            <td>{mechanic.focusFixTimeMillis}</td>
            <td>{mechanic.future}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default MechanicList;
