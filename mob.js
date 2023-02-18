function startMobSpawning() {
  game.mob.weak.spawnInterval = setInterval(() => {
    if (game.paused) return;

    spawnMob(game.mob.weak);
  }, game.mob.weak.spawnIntervalDuration);
}

function stopMobSpawning() {
  clearInterval(game.mob.weak.spawnInterval);
}

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

function moveMob(mob) {
  // vector from mob to player
  const vector = {
    x: player.x - mob.x,
    y: player.y - mob.y,
  };
  // normalize vector to cercle of radius 1
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  vector.x /= length;
  vector.y /= length;
  mob.x += vector.x * mob.speed;
  mob.y += vector.y * mob.speed;
  return mob;
}

function drawMobs() {
  game.mob.weak.alive.forEach((mob) => {
    // move the mob closer to player
    mob = moveMob(mob);
    image(mob.img, mob.x, mob.y, mob.width, mob.height);
  });
}
