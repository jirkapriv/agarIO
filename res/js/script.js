const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const boxik = document.getElementById("ctn");
const nahr = document.getElementById("nahr");
const name = sessionStorage.getItem("name") || "jmeno23";
const scorePlace = document.getElementById("scorePlace");
const death = document.getElementById("death");
const pop = document.getElementById("pop");

let hue = Math.random() * 360; //Random cislo 0 - 360
let hue2 = Math.random() * 360; //Random cislo 0 - 360
let colorCircle = "hsl(" + hue + ",100%,50%)"; //Random barva
let colorCircle2 = "hsl(" + hue2 + ",100%,50%)"; //Random barva
let borderColorCircle = "hsl(" + hue + ",100%,30%)"; //Random barva
let borderColorCircle2 = "hsl(" + hue2 + ",100%,30%)"; //Random barva
let borderThickness = 5;
let borderThickness2 = 2;
let radiusR = 10;
let radius = 40;
let jidlo = 200;
let numOfEnemies = 15;
let speedOfMe = 1;
let score = 0;
let enemySpeed = 0.5;
let dSoundPlayed = false; // Pomucka pro prehrati zvuku jen jednou

let resize = () => {
  canvas.width = window.innerWidth + 2000; // Nastavni velikosti mapy
  canvas.height = window.innerHeight + 2000; // Nastavni velikosti mapy
};

let translateX = -1000; //predela visible plochu na stred X
let translateY = -1000; //predela visible plochu na stred Y

resize();

let circleX = canvas.width / 2; // Nastaveni pozice hrace na stred
let circleY = canvas.height / 2; // Nastaveni pozice hrace na stred
let cX = circleX;
let cY = circleY;

let circles = [];
let enemies = [];

// Nastaveni random pozic pro jidlo do arraye na mape

for (let i = 0; i < jidlo; i++) {
  let rX = Math.floor(Math.random() * canvas.width);
  let rY = Math.floor(Math.random() * canvas.height);
  circles.push([rX, rY]);
}

// Nastaveni random pozic pro enmaky do arraye, jejich velikosti, barvy, smeru jizdy

for (let i = 0; i < numOfEnemies; i++) {
  let enemyX = Math.floor(Math.random() * canvas.width);
  let enemyY = Math.floor(Math.random() * canvas.height);
  let enemyRadius = Math.floor(Math.random() * 210);

  let overlaap = false;
  for (let j = 0; j < enemies.length; j++) {
    let secEnemy = enemies[j];
    let ex = enemyX - secEnemy[0];
    let ey = enemyY - secEnemy[1];
    let min = secEnemy[2] + 200;
    if (ex * ex + ey * ey < min * min) {
      overlaap = true;
      break;
    }
  }

  if (overlaap) {
    i--;
    continue;
  }

  let enemyColor = Math.random() * 360;
  let directionIdentifier = Math.floor(Math.random() * 8 + 1);
  enemies.push([enemyX, enemyY, enemyRadius, enemyColor, directionIdentifier]);
}

let pomucka = 0;
//vykreslovani
let draw = () => {
  //zastaveni movementu kdyz hrac umre
  if (pomucka == 0) {
    const delkaX = cX - circleX;
    const delkaY = cY - circleY;
    const distance = Math.sqrt(delkaX ** 2 + delkaY ** 2);
    if (distance > speedOfMe) {
      const zpomalovac = speedOfMe / distance;

      let proBorderX = circleX + radius + borderThickness;
      let proBorderY = circleY + radius + borderThickness;

      if (
        //hlida kolize
        proBorderX < canvas.width &&
        proBorderY < canvas.height &&
        circleX - borderThickness - radius > 0 &&
        circleY - borderThickness - radius > 0
      ) {
        // upravuje popzici hrace a misto pro zobrazeni plochy na opacnou stranu
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
    // maze canvas aby nezustavali stopy
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // vykreslit array s jidlem
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
      // zvetsi hrace
      radius += Math.sqrt(radiusR / Math.PI) / 2;
    }
  }
  // vykreslit array s enemaky
  for (let i = 0; i < enemies.length; i++) {
    let enemyX = enemies[i][0];
    let enemyY = enemies[i][1];
    let enemyRadius = enemies[i][2];
    let enemyColor = enemies[i][3];
    let directionIdentifier = enemies[i][4];
    let enemyColorE = "hsl(" + enemyColor + ",100%,60%)";
    let enemyColorB = "hsl(" + enemyColor + ",100%,30%)";

    // pohyb enemaku
    if (directionIdentifier == 1) {
      enemyX += enemySpeed;
    }
    if (directionIdentifier == 2) {
      enemyX -= enemySpeed;
    }
    if (directionIdentifier == 3) {
      enemyX -= enemySpeed;
      enemyY -= enemySpeed;
    }
    if (directionIdentifier == 4) {
      enemyX += enemySpeed;
      enemyY += enemySpeed;
    }
    if (directionIdentifier == 5) {
      enemyX -= enemySpeed;
      enemyY += enemySpeed;
    }
    if (directionIdentifier == 6) {
      enemyX += enemySpeed;
      enemyY -= enemySpeed;
    }
    if (directionIdentifier == 7) {
      enemyY += enemySpeed;
    }
    if (directionIdentifier == 8) {
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

    for (let i = 0; i < enemies.length; i++) {
      for (let u = i + 1; u < enemies.length; u++) {
        let xDistance = enemies[i][0] - enemies[u][0];
        let yDistance = enemies[i][1] - enemies[u][1];
        let distance = Math.sqrt(xDistance ** 2 + yDistance ** 2);

        let rad = enemies[i][2] + enemies[u][2];

        if (distance <= rad) {
          let nwI = enemies[i][4];
          let nwU = enemies[u][4];

          if (nwI % 2 == 0) {
            enemies[i][4] = enemies[i][4] - 1;
          } else {
            enemies[i][4] = enemies[i][4] + 1;
          }

          if (nwU % 2 == 0) {
            enemies[u][4] = enemies[u][4] - 1;
          } else {
            enemies[u][4] = enemies[u][4] + 1;
          }
        }
      }
    }

    // hlida kolize hracu
    if (distance < radius + enemyRadius && radius > enemyRadius) {
      // odebere enemaka
      enemies.splice(i, 1);
      //prehraje zvuk
      pop.play();
      console.log("odebrano");
      score += Math.floor(enemyRadius / 10);
      scorePlace.innerHTML = `Score: ${score}`;
      let enemyX = Math.floor(Math.random() * canvas.width);
      let enemyY = Math.floor(Math.random() * canvas.height);
      enemyRadius = Math.floor(Math.random() * 200);
      let enemyColor = Math.random() * 360;
      let directionIdentifier = Math.floor(Math.random() * 8 + 1);
      let overlaap = false;
      for (let j = 0; j < enemies.length; j++) {
        let secEnemy = enemies[j];
        let ex = enemyX - secEnemy[0];
        let ey = enemyY - secEnemy[1];
        let min = secEnemy[2] + 200;
        if (ex * ex + ey * ey < min * min) {
          overlaap = true;
          break;
        }
      }

      if (overlaap) {
        i--;
        continue;
      }

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
    } // hlida kolize mezi enemaky a borderem
    else if (
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
      let overlaap = false;
      for (let j = 0; j < enemies.length; j++) {
        let secEnemy = enemies[j];
        let ex = enemyX - secEnemy[0];
        let ey = enemyY - secEnemy[1];
        let min = secEnemy[2] + 200;
        if (ex * ex + ey * ey < min * min) {
          overlaap = true;
          break;
        }
      }

      if (overlaap) {
        i--;
        continue;
      }

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

  // predelava hodnotu posunuti plochy, ktera je videt
  canvas.style.transform = `translate(${translateX}px, ${translateY}px)`;

  // vola opakovane draw a animuje tim
  requestAnimationFrame(draw);
};

let start = () => {
  resize();
  window.addEventListener("resize", () => {
    resize();
    draw();
  });

  // bere soradnice mysi vzdy kdyz pohnes mysi na obrazovce
  window.addEventListener("mousemove", (event) => {
    //korekce
    const canvasRect = canvas.getBoundingClientRect();
    cX = event.clientX - canvasRect.left;
    cY = event.clientY - canvasRect.top;
  });

  requestAnimationFrame(draw);
};
// zobrazeni jmena
nahr.innerHTML = name;

start();
