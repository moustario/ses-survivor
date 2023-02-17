const canva = {
  background: "#b2b2b2",
  width: 800,
  height: 440,
};

const player = {
  width: 50,
  height: 50,
  x: canva.width / 2 - 25,
  y: canva.height / 2 - 25,
  speed: 2,
  imgPath: "./assets/joel.png",
  direction: {
    vx: 0,
    vy: 0,
  },
};

let bullets = [];

const game = {
  paused: false,
  mob: {
    weak: {
      alive: [],
      killed: 0,
      spawnIntervalDuration: 1000,
      spawnInterval: null,
      imgPath: "./assets/akon.png",
      width: 50,
      height: 50,
      speed: 1,
      radiusFromPlayer: 350,
      overlap: 0.4, // percentage of overlap between mobs
      health: 5,
    },
  },
  bullet: {
    imgPath: "./assets/raquette.png",
    speed: 3,
    with: 40,
    height: 40,
    lifetime: 900,
    shootingInterval: null,
    shootingIntervalDuration: 2000,
    damage: 5,
  },
};

function setup() {
  createCanvas(canva.width, canva.height);
  background(canva.background);
  player.img = loadImage(player.imgPath);
  game.bullet.img = loadImage(game.bullet.imgPath);
  startMobSpawning();
  startBulletShooting();
}

function draw() {
  background(canva.background);
  drawPlayer();

  playerControls();
  drawBullets();
  drawMobs();

  handleCollisions();
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
    player.direction.vx = -1;
    player.direction.vy = 0;
    player.x -= player.speed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.direction.vx = 1;
    player.direction.vy = 0;
    player.x += player.speed;
  } else if (keyIsDown(UP_ARROW)) {
    player.direction.vx = 0;
    player.direction.vy = -1;
    player.y -= player.speed;
  } else if (keyIsDown(DOWN_ARROW)) {
    player.direction.vx = 0;
    player.direction.vy = 1;
    player.y += player.speed;
  }
  // diagonal movements
  if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
    player.direction.vx = -1 / 3;
    player.direction.vy = -1 / 3;
    player.x -= player.speed / 3;
    player.y -= player.speed / 3;
  } else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)) {
    player.direction.vx = -1 / 3;
    player.direction.vy = 1 / 3;
    player.x -= player.speed / 3;
    player.y += player.speed / 3;
  } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
    player.direction.vx = 1 / 3;
    player.direction.vy = -1 / 3;
    player.x += player.speed / 3;
    player.y -= player.speed / 3;
  } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)) {
    player.direction.vx = 1 / 3;
    player.direction.vy = 1 / 3;
    player.x += player.speed / 3;
    player.y += player.speed / 3;
  }
}

function drawBullets() {
  bullets.forEach((bullet) => {
    bullet.x += bullet.direction.vx * game.bullet.speed;
    bullet.y += bullet.direction.vy * game.bullet.speed;
    image(game.bullet.img, bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

function cleanObjects() {
  // remove old bullets
  bullets = bullets.filter((bullet) => {
    if (millis() - bullet.creationTime > game.bullet.lifetime) {
      return false;
    }
    if (bullet.hit) {
      return false;
    }
    return true;
  });

  // remove dead mobs
  game.mob.weak.alive = game.mob.weak.alive.filter((mob) => {
    if (mob.health <= 0) {
      return false;
    }
    return true;
  });
}

function shootBullet() {
  let new_bullet = {};
  new_bullet.x = Number(player.x);
  new_bullet.y = Number(player.y + (player.height - game.bullet.height) / 2);
  new_bullet.width = Number(game.bullet.width);
  new_bullet.height = Number(game.bullet.height);
  new_bullet.lifetime = Number(game.bullet.speed);
  new_bullet.creationTime = millis();
  new_bullet.hit = false;
  new_bullet.damage = Number(game.bullet.damage);
  new_bullet.direction = { vx: 0, vy: 0 };

  // if no mob is alive, fire in direction of player
  if (game.mob.weak.alive.length === 0) {
    new_bullet.direction.vx = Number(player.direction.vx);
    new_bullet.direction.vy = Number(player.direction.vy);
    bullets.push(new_bullet);
    return;
  }
  // fire in direction of closest mob
  let closestMob = game.mob.weak.alive.reduce((closest, current) => {
    let closestDistance = dist(closest.x, closest.y, player.x, player.y);
    let currentDistance = dist(current.x, current.y, player.x, player.y);
    return closestDistance < currentDistance ? closest : current;
  }, game.mob.weak.alive[0]);
  let angle = atan2(
    Number(closestMob.y) - Number(player.y),
    Number(closestMob.x) - Number(player.x)
  );
  new_bullet.direction.vx = cos(angle);
  new_bullet.direction.vy = sin(angle);
  bullets.push(new_bullet);
}

function keyPressed() {
  // On echap key pause the game
  if (keyCode === 32 && !game.paused) {
    drawPause();
    noLoop();
    console.log("game paused");
    game.paused = true;
  } else if (keyCode === 32 && game.paused) {
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
    if (game.paused) return;

    spawnMob(game.mob.weak);
  }, game.mob.weak.spawnIntervalDuration);
}

function stopMobSpawning() {
  clearInterval(game.mob.weak.spawnInterval);
}

const startBulletShooting = () => {
  game.bullet.shootingInterval = setInterval(() => {
    if (game.paused) return;

    shootBullet();
  }, game.bullet.shootingIntervalDuration);
};

const stopBulletShooting = () => {
  clearInterval(game.bullet.shootingInterval);
};

/**
 * Spawn a mob in a random position at a certain distance from the player
 * @param {Object} { imgPath, width, height, speed, radiusFromPlayer, overlap } Patron of the mob to spawn
 */
function spawnMob({
  imgPath,
  width,
  height,
  speed,
  radiusFromPlayer,
  overlap,
  health,
}) {
  let new_mob = {};
  new_mob.img = loadImage(imgPath);
  new_mob.width = width;
  new_mob.height = height;
  new_mob.speed = speed;
  new_mob.x = player.x + random(-radiusFromPlayer, radiusFromPlayer);
  new_mob.y = player.y + random(-radiusFromPlayer, radiusFromPlayer);
  new_mob.overlap = overlap;
  new_mob.health = health;
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
    image(mob.img, mob.x, mob.y, mob.width, mob.height);
  });
}

function handleCollisions() {
  // check for collision with other mobs allowing the mob overlap
  game.mob.weak.alive.forEach((mob) => {
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
  });

  let mob, bullet;
  // handle collision between bullet and mob
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < game.mob.weak.alive.length; j++) {
      mob = game.mob.weak.alive[j];
      bullet = bullets[i];

      bulletPeaks = [
        { x: bullet.x, y: bullet.y },
        { x: bullet.x + bullet.width, y: bullet.y },
        { x: bullet.x, y: bullet.y + bullet.height },
        { x: bullet.x + bullet.width, y: bullet.y + bullet.height },
      ];
      if (
        bulletPeaks.some(
          (peak) =>
            peak.x > mob.x &&
            peak.x < mob.x + mob.width &&
            peak.y > mob.y &&
            peak.y < mob.y + mob.height
        )
      ) {
        game.mob.weak.alive[j].health -= bullet.damage;
        bullets[i].hit = true;
        game.mob.weak.killed++;
      }
    }
  }
}
