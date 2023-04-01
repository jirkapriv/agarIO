const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const boxik = document.getElementById("ctn");
const nahr = document.getElementById("nahr");
const name = sessionStorage.getItem("name") || "jmeno23";
const scorePlace = document.getElementById("scorePlace");
const death = document.getElementById("death");
const pop = document.getElementById("pop");

let hue = Math.random() * 360;
let hue2 = Math.random() * 360;
let colorCircle = "hsl(" + hue + ",100%,50%)";
let colorCircle2 = "hsl(" + hue2 + ",100%,50%)";
let borderColorCircle = "hsl(" + hue + ",100%,30%)";
let borderColorCircle2 = "hsl(" + hue2 + ",100%,30%)";
let borderThickness = 5;
let borderThickness2 = 2;
let radiusR = 10;
let radius = 40;
let jidlo = 200;
let numOfEnemies = 10;
let speedOfMe = 1;
let score = 0;
let enemySpeed = 0.5;
let dSoundPlayed = false;

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
let enemies = [];

for (let i = 0; i < jidlo; i++) {
  let rX = Math.floor(Math.random() * canvas.width);
  let rY = Math.floor(Math.random() * canvas.height);
  circles.push([rX, rY]);
}

for (let c = 0; c < numOfEnemies; c++) {
  let enemyX = Math.floor(Math.random() * canvas.width);
  let enemyY = Math.floor(Math.random() * canvas.height);
  let enemyRadius = Math.floor(Math.random() * 200);
  let enemyColor = Math.random() * 360;
  let directionIdentifier = Math.floor(Math.random() * 8 + 1);
  enemies.push([enemyX, enemyY, enemyRadius, enemyColor, directionIdentifier]);
}

let pomucka = 0;
function draw() {
  if (pomucka == 0) {
    const delkaX = cX - circleX;
    const delkaY = cY - circleY;
    const distance = Math.sqrt(delkaX ** 2 + delkaY ** 2);
    if (distance > speedOfMe) {
      const zpomalovac = speedOfMe / distance;

      let proBorderX = circleX + radius + borderThickness;
      let proBorderY = circleY + radius + borderThickness;

      if (
        proBorderX < canvas.width &&
        proBorderY < canvas.height &&
        circleX - borderThickness - radius > 0 &&
        circleY - borderThickness - radius > 0
      ) {
        circleX += delkaX * zpomalovac;
        circleY += delkaY * zpomalovac;
        translateX -= delkaX * zpomalovac;
        translateY -= delkaY * zpomalovac;
      } else {
        boxik.style.display = "flex";

        if (!dSoundPlayed) {
          death.play();
          dSoundPlayed = true;
        }
      }
    } else {
      circleX = cX;
      circleY = cY;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

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
      pop.play();
      score += 1;
      scorePlace.innerHTML = `Score: ${score}`;
      console.log("odebrano");
      let rX = Math.floor(Math.random() * canvas.width);
      let rY = Math.floor(Math.random() * canvas.height);
      circles.push([rX, rY]);
      radius += Math.sqrt(radiusR / Math.PI) / 2;
    }
  }
  for (let i = 0; i < enemies.length; i++) {
    let enemyX = enemies[i][0];
    let enemyY = enemies[i][1];
    let enemyRadius = enemies[i][2];
    let enemyColor = enemies[i][3];
    let directionIdentifier = enemies[i][4];
    let enemyColorE = "hsl(" + enemyColor + ",100%,60%)";
    let enemyColorB = "hsl(" + enemyColor + ",100%,30%)";

    if (directionIdentifier == 1) {
      enemyX += 0.5;
    }
    if (directionIdentifier == 2) {
      enemyX -= enemySpeed;
    }
    if (directionIdentifier == 3) {
      enemyY += enemySpeed;
    }
    if (directionIdentifier == 4) {
      enemyY -= enemySpeed;
    }
    if (directionIdentifier == 5) {
      enemyX += enemySpeed;
      enemyY -= enemySpeed;
    }
    if (directionIdentifier == 6) {
      enemyX += enemySpeed;
      enemyY += enemySpeed;
    }
    if (directionIdentifier == 7) {
      enemyX -= enemySpeed;
      enemyY += enemySpeed;
    }
    if (directionIdentifier == 8) {
      enemyX -= enemySpeed;
      enemyY -= enemySpeed;
    }
    if (directionIdentifier == 9) {
      console.log("error");
    }

    enemies[i] = [enemyX, enemyY, enemyRadius, enemyColor, directionIdentifier];

    ctx.beginPath();
    ctx.arc(enemyX, enemyY, enemyRadius, 0, Math.PI * 2);
    ctx.fillStyle = enemyColorE;
    ctx.strokeStyle = enemyColorB;
    ctx.lineWidth = 5;
    ctx.fill();
    ctx.stroke();

    const distance = Math.sqrt(
      (enemyX - circleX) ** 2 + (enemyY - circleY) ** 2
    );

    if (distance < radius + enemyRadius && radius > enemyRadius) {
      enemies.splice(i, 1);
      pop.play();
      console.log("odebrano");
      score += Math.floor(enemyRadius / 10);
      scorePlace.innerHTML = `Score: ${score}`;
      let enemyX = Math.floor(Math.random() * canvas.width);
      let enemyY = Math.floor(Math.random() * canvas.height);
      enemyRadius = Math.floor(Math.random() * 200);
      let enemyColor = Math.random() * 360;
      let directionIdentifier = Math.floor(Math.random() * 8 + 1);
      enemies.push([
        enemyX,
        enemyY,
        enemyRadius,
        enemyColor,
        directionIdentifier,
      ]);
      radius += Math.sqrt(enemyRadius / Math.PI) / 2;
    } else if (distance < radius + enemyRadius && radius < enemyRadius) {
      boxik.style.display = "flex";

      if (!dSoundPlayed) {
        death.play();
        dSoundPlayed = true;
      }

      pomucka += 1;
    } else if (
      enemyX + enemyRadius > canvas.width ||
      enemyY + enemyRadius > canvas.height ||
      enemyX - borderThickness - enemyRadius < 0 ||
      enemyY - borderThickness - enemyRadius < 0
    ) {
      enemies.splice(i, 1);
      console.log("enemy spliced");
      let enemyX = Math.floor(Math.random() * canvas.width);
      let enemyY = Math.floor(Math.random() * canvas.height);
      enemyRadius = Math.floor(Math.random() * 200);
      let enemyColor = Math.random() * 360;
      let directionIdentifier = Math.floor(Math.random() * 8 + 1);
      enemies.push([
        enemyX,
        enemyY,
        enemyRadius,
        enemyColor,
        directionIdentifier,
      ]);
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

nahr.innerHTML = name;

start();
