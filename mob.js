const mobPatron = {
  weak: {
    spawnIntervalDuration: 1000,
    imgPath: "./assets/akon.png",
    width: 25,
    height: 35,
    speed: 1,
    spawingHalo: {
      start: player.width * 3,
      end: canva.width / 2,
    },
    overlap: 0.6, // percentage of overlap between mobs
    health: 5,
    damage: 1,
  },
};

function startMobSpawning() {
  game.mob.weak.spawnInterval = setInterval(() => {
    if (game.paused) return;

    spawnMob(mobPatron.weak);
  }, mobPatron.weak.spawnIntervalDuration);
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
  overlap,
  health,
  spawingHalo,
  damage,
}) {
  let new_mob = {};
  new_mob.img = loadImage(imgPath);
  new_mob.width = width;
  new_mob.height = height;
  new_mob.speed = speed;
  // random position betwen cercle of radius spawnHalo.start and spawnHalo.end
  const distanceFromPlayer = random(spawingHalo.start, spawingHalo.end);
  // random angle
  const angle = random(0, 2 * Math.PI);
  new_mob.x = player.x + distanceFromPlayer * Math.cos(angle);
  new_mob.y = player.y + distanceFromPlayer * Math.sin(angle);
  new_mob.overlap = overlap;
  new_mob.health = health;
  new_mob.damage = damage;
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
