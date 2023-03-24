const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

let radius = 50;
let speed = 1;

let hue = Math.random() * 360;
let hue2 = Math.random() * 360;
let colorCircle = "hsl(" + hue + ",100%,50%)";
let colorCircle2 = "hsl(" + hue2 + ",100%,50%)";
let borderColorCircle = "hsl(" + hue + ",100%,30%)";
let borderColorCircle2 = "hsl(" + hue2 + ",100%,30%)";
let borderThickness = 5;
let borderThickness2 = 2;

let radiusR = 10;
let jidlo = 200;

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

let circles = [];

for (let i = 0; i < jidlo; i++) {
  let rX = Math.floor(Math.random() * canvas.width);
  let rY = Math.floor(Math.random() * canvas.height);
  circles.push([rX, rY]);
}

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

  // vykreslit array
  for (let i = 0; i < circles.length; i++) {
    let rX = circles[i][0];
    let rY = circles[i][1];
    ctx.beginPath();
    ctx.arc(rX, rY, radiusR, 0, Math.PI * 2);
    ctx.fillStyle = colorCircle2;
    ctx.strokeStyle = borderColorCircle2;
    ctx.lineWidth = borderThickness2;
    ctx.fill();
    ctx.stroke();

    const distance = Math.sqrt((rX - circleX) ** 2 + (rY - circleY) ** 2);
    if (distance < radius + radiusR) {
      circles.splice(i, 1);
      console.log("odebrano");
      let rX = Math.floor(Math.random() * canvas.width);
      let rY = Math.floor(Math.random() * canvas.height);
      circles.push([rX, rY]);
    }
  }

  // hrac
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
