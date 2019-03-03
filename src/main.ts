import { nextGeneration, render } from "./gameoflife";

const canvas = document.createElement("canvas");
document
  .getElementById("app")
  .appendChild(canvas);
const runButton = document.getElementById("run");
const nextButton = document.getElementById("next");

canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext("2d");
let zoom = 1;
let id: number;

let gameOfLife = [
  "0,2",
  "0,3",
  "1,2",
  "1,3",
  "8,3",
  "8,4",
  "9,2",
  "9,4",
  "10,2",
  "10,3",
  "16,4",
  "16,5",
  "16,6",
  "17,4",
  "18,5",
  "22,1",
  "22,2",
  "23,0",
  "23,2",
  "24,0",
  "24,1",
  "24,12",
  "24,13",
  "25,12",
  "25,14",
  "26,12",
  "34,0",
  "34,1",
  "35,0",
  "35,1",
  "35,7",
  "35,8",
  "35,9",
  "36,7",
  "37,8"
];

render(ctx, gameOfLife, zoom);

canvas.addEventListener("wheel", (e) => {
  zoom += e.deltaY > 0 ? 0.05 : -0.05;
  render(ctx, gameOfLife, zoom);
});

function renderNextGen() {
  gameOfLife = nextGeneration(gameOfLife);
  render(ctx, gameOfLife, zoom);
}

runButton.addEventListener("click", (e) => {
  if (!id) {
    runButton.innerText = "stop";
    id = setInterval(renderNextGen, 20);
  } else {
    clearInterval(id);
    id = null;
    runButton.innerText = "run";
  }
});

nextButton.addEventListener("click", renderNextGen);
