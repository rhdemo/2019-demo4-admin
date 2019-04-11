import React from "react";
import getMachineViz from "../common/getMachineViz"

function getMechanicList(optaplanner) {
  if (!optaplanner) {
    return [];
  }

  let mechanics = [];
  for (let key in optaplanner) {
    let value = optaplanner[key];
    if (value && value.mechanic && (value.responseType === "DISPATCH_MECHANIC" || value.responseType === "ADD_MECHANIC")) {
      let mechanic = {...value.mechanic};
      let future = optaplanner[`${key}-futureIndexes`];
      if (future && future.futureMachineIndexes) {
        mechanic.futureMachineIndexes = future.futureMachineIndexes.map(f => getMachineViz(f).label).join(", ");
      }

      mechanics.push(mechanic);
    }
  }
  mechanics.sort((a, b) => a.mechanicIndex - b.mechanicIndex);
  return mechanics
}

function MechanicList({socket, optaplanner}) {
  const mechanicArray = getMechanicList(optaplanner);

  return (
    <div className="mechanic-list subsection">
      <table className="table">
        <thead>
        <tr>
          <th>Index</th>
          <th>Original</th>
          <th>Focus</th>
          <th>Travel</th>
          <th>Fix Time</th>
          <th>Future</th>
        </tr>
        </thead>
        <tbody>
        {mechanicArray.map((mechanic, index) => (
          <tr key={mechanic.mechanicIndex}>
            <td>{mechanic.mechanicIndex}</td>
            <td>{getMachineViz(mechanic.originalMachineIndex).label}</td>
            <td>{getMachineViz(mechanic.focusMachineIndex).label}</td>
            <td>{mechanic.focusTravelDurationMillis}</td>
            <td>{mechanic.focusFixDurationMillis}</td>
            <td>{mechanic.futureMachineIndexes}</td>
          </tr>)
        )}
        </tbody>
      </table>
    </div>
  );
}

export default MechanicList;
