import React from "react";

function getMechanicList(optaplanner) {
  if (!optaplanner) {
    return [];
  }

  let arr = [];
  for (let key in optaplanner) {
    let value = optaplanner[key];
    if (!value || !value.mechanic || (value.responseType !== "DISPATCH_MECHANIC" && value.responseType !== "ADD_MECHANIC")) {
      continue;
    }
    let mechanic = {...value.mechanic};
    mechanic.key = key;
    mechanic.future = JSON.stringify(mechanic.futureMachineIndexes);
    arr.push(mechanic);
  }
  arr.sort((a, b) => a.mechanicIndex - b.mechanicIndex);
  return arr;
}

function MechanicList({socket, optaplanner}) {
  const mechanicArray = getMechanicList(optaplanner);

  return (
    <div className="mechanic-list subsection">
      <table className="table">
        <thead>
        <tr>
          <th>Key</th>
          <th>Index</th>
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
            <td>{mechanic.key}</td>
            <td>{mechanic.mechanicIndex}</td>
            <td>{mechanic.originalMachineIndex}</td>
            <td>{mechanic.focusMachineIndex}</td>
            <td>{mechanic.focusTravelDurationMillis}</td>
            <td>{mechanic.focusFixDurationMillis}</td>
            <td>{mechanic.future}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default MechanicList;
