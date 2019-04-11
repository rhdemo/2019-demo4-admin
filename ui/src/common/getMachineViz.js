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

function getMachineViz(index) {
  return MACHINE_VIZ[index] || {label: index, style: {color: "white", backgroundColor: "black"}};
}

export default getMachineViz;