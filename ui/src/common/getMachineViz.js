const MACHINE_YELLOW = "#fff43d";
const MACHINE_RED = "#FF5050";
const MACHINE_TURQUOISE = "#0EE2D2";
const MACHINE_BABY_BLUE = "#28C1EA";
const MACHINE_GREEN = "#60F534";
const MACHINE_PURPLE = "#9A45F4";
const MACHINE_BLACK = "#4B6566";
const MACHINE_RED_ALT = "#FF5050";
const MACHINE_PINK = "#E53CE1";

const MACHINE_VIZ = [
  {label: "A", style: {color: "#363636", backgroundColor: MACHINE_YELLOW}},
  {label: "B", style: {color: "white", backgroundColor: MACHINE_RED}},
  {label: "C", style: {color: "white", backgroundColor: MACHINE_TURQUOISE}},
  {label: "D", style: {color: "white", backgroundColor: MACHINE_BABY_BLUE}},
  {label: "E", style: {color: "#363636", backgroundColor: MACHINE_GREEN}},
  {label: "F", style: {color: "white", backgroundColor: MACHINE_PURPLE}},
  {label: "G", style: {color: "white", backgroundColor: MACHINE_BLACK}},
  {label: "H", style: {color: "white", backgroundColor: MACHINE_BABY_BLUE}},
  {label: "I", style: {color: "white", backgroundColor: MACHINE_RED_ALT}},
  {label: "J", style: {color: "white", backgroundColor: MACHINE_PINK}}
];

function getMachineViz(index) {
  return MACHINE_VIZ[index] || {label: index, style: {color: "white", backgroundColor: "black"}};
}

export default getMachineViz;
