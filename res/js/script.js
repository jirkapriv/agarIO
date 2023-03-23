const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

let radius = 50;
let speed = 1;

let hue = Math.random() * 360;
let colorCircle = "hsl(" + hue + ",100%,50%)";
let borderColorCircle = "hsl(" + hue + ",100%,30%)";
let borderThickness = 5;

let resize = () => {
  canvas.width = window.innerWidth + 2000;
  canvas.height = window.innerHeight + 2000;
};
let translateX = -1000;
let translateY = -1000;
resize();
let circleX = canvas.width / 2;
let circleY = canvas.height / 2;
let cX = circleX;
let cY = circleY;

function draw() {
  const delkaX = cX - circleX;
  const delkaY = cY - circleY;
  const distance = Math.sqrt(delkaX ** 2 + delkaY ** 2);
  if (distance > speed) {
    const zpomalovac = speed / distance;
    circleX += delkaX * zpomalovac;
    circleY += delkaY * zpomalovac;
    translateX -= delkaX * zpomalovac;
    translateY -= delkaY * zpomalovac;
  } else {
    circleX = cX;
    circleY = cY;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
  ctx.fillStyle = colorCircle;
  ctx.strokeStyle = borderColorCircle;
  ctx.lineWidth = borderThickness;
  ctx.fill();
  ctx.stroke();

  canvas.style.transform = `translate(${translateX}px, ${translateY}px)`;

  requestAnimationFrame(draw);
}

function start() {
  resize();
  window.addEventListener("resize", () => {
    resize();
    draw();
  });

  window.addEventListener("mousemove", (event) => {
    const canvasRect = canvas.getBoundingClientRect();
    cX = event.clientX - canvasRect.left;
    cY = event.clientY - canvasRect.top;
  });

  requestAnimationFrame(draw);
}

start();

console.log(canvas.getBoundingClientRect());
