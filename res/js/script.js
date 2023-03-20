const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

let cX;
let cY;

let hue = Math.random() * 360;
let colorCircle = "hsl(" + hue + ",100%,50%)";
let borderColorCircle = "hsl(" + hue + ",100%,30%)";
let borderThickness = 10;
let circleX = 200;
let circleY = 200;
let circleRadius = 100;

let resize = () => {
  canvas.width = window.innerWidth + 2000;
  canvas.height = window.innerHeight + 2000;
};

resize();

ctx.beginPath();
ctx.fillStyle = colorCircle;
ctx.strokeStyle = borderColorCircle;
ctx.lineWidth = borderThickness;
ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();

let getCursorCoo = (event) => {
  cX = event.clientX;
  cY = event.clientY;
  console.log(cX + " " + cY);
};

document.addEventListener("mousemove", getCursorCoo);


