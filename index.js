const canva = {
  background: "#b2b2b2",
  width: 800,
  height: 440,
};

const player = {
  width: 50,
  height: 50,
  x: 10,
  y: 10,
  speed: 2,
  direction: "down",
  imgPath: "./assets/joel.png",
};

const bulletPatron = {
  imgPath: "./assets/raquette.png",
  speed: 3,
  with: 40,
  height: 40,
  lifetime: 900,
};

let bullets = [];

const game = {
  paused: false,
  mob: {
    weak: {
      alive: [],
      killed: 0,
      spawnIntervalDuration: 5000,
      spawnInterval: null,
      imgPath: "./assets/akon.png",
      width: 50,
      height: 50,
      speed: 1,
      radiusFromPlayer: 350,
      overlap: 0.4, // percentage of overlap between mobs
    },
  },
};

function setup() {
  createCanvas(canva.width, canva.height);
  background(canva.background);
  player.img = loadImage(player.imgPath);
  bulletPatron.img = loadImage(bulletPatron.imgPath);
  startMobSpawning();
}

function draw() {
  background(canva.background);
  drawPlayer();

  playerControls();
  drawBullets();
  drawMobs();

  cleanObjects();
}

function drawPlayer() {
  // Player boundaries
  if (player.x < 0) {
    player.x = 0;
  } else if (player.x > canva.width - player.width) {
    player.x = canva.width - player.width;
  } else if (player.y < 0) {
    player.y = 0;
  } else if (player.y > canva.height - player.height) {
    player.y = canva.height - player.height;
  }
  image(player.img, player.x, player.y, player.width, player.height);
}

function playerControls() {
  // Player movement
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= player.speed;
    player.direction = "left";
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.x += player.speed;
    player.direction = "right";
  } else if (keyIsDown(UP_ARROW)) {
    player.y -= player.speed;
    player.direction = "up";
  } else if (keyIsDown(DOWN_ARROW)) {
    player.y += player.speed;
    player.direction = "down";
  }
  // diagonal movements
  if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
    player.x -= player.speed / 3;
    player.y -= player.speed / 3;
  } else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)) {
    player.x -= player.speed / 3;
    player.y += player.speed / 3;
  } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
    player.x += player.speed / 3;
    player.y -= player.speed / 3;
  } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)) {
    player.x += player.speed / 3;
    player.y += player.speed / 3;
  }
}

function drawBullets() {
  bullets.forEach((bullet) => {
    if (bullet.direction === "left") {
      bullet.x -= bulletPatron.speed;
    } else if (bullet.direction === "right") {
      bullet.x += bulletPatron.speed;
    } else if (bullet.direction === "up") {
      bullet.y -= bulletPatron.speed;
    } else if (bullet.direction === "down") {
      bullet.y += bulletPatron.speed;
    }
    image(bulletPatron.img, bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

function cleanObjects() {
  bullets = bullets.filter((bullet) => {
    if (millis() - bullet.creationTime > bulletPatron.lifetime) {
      return false;
    }
    return true;
  });
}

function keyPressed() {
  // bullet shooting
  if (keyCode === 32) {
    let new_bullet = {};
    new_bullet.x = Number(player.x);
    new_bullet.y = Number(player.y + (player.height - bulletPatron.height) / 2);
    new_bullet.width = Number(bulletPatron.width);
    new_bullet.height = Number(bulletPatron.height);
    new_bullet.direction = String(player.direction);
    new_bullet.lifetime = Number(bulletPatron.speed);
    new_bullet.creationTime = millis();
    bullets.push(new_bullet);
  }

  // On echap key pause the game
  if (keyCode === 27 && !game.paused) {
    drawPause();
    noLoop();
    console.log("game paused");
    game.paused = true;
  } else if (keyCode === 27 && game.paused) {
    loop();
    console.log("game resumed");
    game.paused = false;
  }
}

function drawPause() {
  fill(255, 0, 0);
  textSize(32);
  text("Game paused", 10, 30);
}

function startMobSpawning() {
  game.mob.weak.spawnInterval = setInterval(() => {
    spawnMob(game.mob.weak);
  }, game.mob.weak.spawnIntervalDuration);
}

function stopMobSpawning() {
  clearInterval(game.mob.weak.spawnInterval);
}

/**
 * Spawn a mob in a random position at a certain distance from the player
 * @param {Object} { imgPath, width, height, speed, radiusFromPlayer } Patron of the mob to spawn
 */
function spawnMob({
  imgPath,
  width,
  height,
  speed,
  radiusFromPlayer,
  overlap,
}) {
  let new_mob = {};
  new_mob.img = loadImage(imgPath);
  new_mob.width = width;
  new_mob.height = height;
  new_mob.speed = speed;
  new_mob.x = player.x + random(-radiusFromPlayer, radiusFromPlayer);
  new_mob.y = player.y + random(-radiusFromPlayer, radiusFromPlayer);
  new_mob.overlap = overlap;
  game.mob.weak.alive.push(new_mob);
}

function drawMobs() {
  game.mob.weak.alive.forEach((mob) => {
    // move the mob closer to player
    if (player.x > mob.x) {
      mob.x += mob.speed;
    } else if (player.x < mob.x) {
      mob.x -= mob.speed;
    }
    if (player.y > mob.y) {
      mob.y += mob.speed;
    } else if (player.y < mob.y) {
      mob.y -= mob.speed;
    }
    // check for collision with other mobs allowing the mob overlap
    game.mob.weak.alive.forEach((otherMob) => {
      if (mob !== otherMob) {
        if (
          mob.x < otherMob.x + otherMob.width * mob.overlap &&
          mob.x + mob.width * mob.overlap > otherMob.x &&
          mob.y < otherMob.y + otherMob.height * mob.overlap &&
          mob.y + mob.height * mob.overlap > otherMob.y
        ) {
          // collision detected
          if (mob.x < otherMob.x) {
            mob.x -= mob.speed;
          } else if (mob.x > otherMob.x) {
            mob.x += mob.speed;
          }
          if (mob.y < otherMob.y) {
            mob.y -= mob.speed;
          } else if (mob.y > otherMob.y) {
            mob.y += mob.speed;
          }
        }
      }
    });
    image(mob.img, mob.x, mob.y, mob.width, mob.height);
  });
}
