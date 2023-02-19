const bulletPatron = {
  imgPath: "./assets/raquette.png",
  // limite around 3
  speed: 2,
  with: 40,
  height: 40,
  lifetime: 900,
  shootingInterval: null,
  shootingIntervalDuration: 2000,
  damage: 5,
};

function drawBullets() {
  bullets.forEach((bullet) => {
    bullet.x += bullet.direction.vx * bulletPatron.speed;
    bullet.y += bullet.direction.vy * bulletPatron.speed;
    image(bulletPatron.img, bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

function loadBullet() {
  bulletPatron.img = loadImage(bulletPatron.imgPath);
}

function shootBullet() {
  // if no mob is alive, no bullet is fired
  if (game.mob.weak.alive.length === 0) {
    return;
  }

  // play bullet sound, has a bit a of a delay
  game.effects.bulletSound.loop = false;
  game.effects.bulletSound.play();

  // We delay the creation of the bullet to compensate for the sound
  setTimeout(() => {
    let new_bullet = {};

    // new bullet must spawn at the center of the player
    new_bullet.x = Number(player.x);
    new_bullet.y = Number(player.y);

    new_bullet.width = Number(bulletPatron.width);
    new_bullet.height = Number(bulletPatron.height);
    new_bullet.lifetime = Number(bulletPatron.speed);
    new_bullet.creationTime = millis();
    new_bullet.hit = false;
    new_bullet.damage = Number(bulletPatron.damage);
    new_bullet.direction = { vx: 0, vy: 0 };

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
  }, game.effects.soundTimeout);
}

function cleanBullets() {
  // remove old bullets
  bullets = bullets.filter((bullet) => {
    if (millis() - bullet.creationTime > bulletPatron.lifetime) {
      return false;
    }
    if (bullet.hit) {
      return false;
    }
    return true;
  });
}

function collisionWithMob(mobsArray) {
  let currMob, bullet;
  // handle collision between bullet and mob
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < mobsArray.length; j++) {
      currMob = mobsArray[j];
      bullet = bullets[i];

      bulletPeaks = [
        { x: bullet.x, y: bullet.y },
        { x: bullet.x + bullet.width, y: bullet.y },
        { x: bullet.x, y: bullet.y + bullet.height },
        { x: bullet.x + bullet.width, y: bullet.y + bullet.height },
      ];

      mobPeaks = [
        { x: currMob.x, y: currMob.y },
        { x: currMob.x + currMob.width, y: currMob.y },
        { x: currMob.x, y: currMob.y + currMob.height },
        { x: currMob.x + currMob.width, y: currMob.y + currMob.height },
      ];
      if (
        bulletPeaks.some(
          (peak) =>
            peak.x > currMob.x &&
            peak.x < currMob.x + currMob.width &&
            peak.y > currMob.y &&
            peak.y < currMob.y + currMob.height
        ) ||
        mobPeaks.some(
          (peak) =>
            peak.x > bullet.x &&
            peak.x < bullet.x + bullet.width &&
            peak.y > bullet.y &&
            peak.y < bullet.y + bullet.height
        )
      ) {
        mobsArray[j].health -= bullet.damage;
        bullets[i].hit = true;
        game.mob.weak.killed++;
      }
    }
  }
}

const startBulletShooting = () => {
  bulletPatron.shootingInterval = setInterval(() => {
    if (!gameIsRunning()) return;

    shootBullet();
  }, bulletPatron.shootingIntervalDuration);
};

const stopBulletShooting = () => {
  clearInterval(bulletPatron.shootingInterval);
};
