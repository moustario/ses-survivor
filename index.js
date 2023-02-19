function preload() {
  game.music = createAudio(game.effects.backgroundMusicPath);
  game.effects.bulletSound = new Audio(game.effects.bulletSoundPath);
  loadBackGround();
}

function setup() {
  createCanvas(canva.width, canva.height);
  loadPlayer();
  loadBullet();
  loadUI();
  startMobSpawning();
  startBulletShooting();
  startBackgroundMusic();

  game.startingTime = millis();
}

function draw() {
  drawBackground();

  drawPlayer();
  playerControls();

  drawBullets();
  drawMobs();

  handleCollisions();
  cleanObjects();

  checkEndGame();

  drawUI();
}

function checkEndGame() {
  if (player.health <= 0) {
    game.gameOver = true;
    noLoop();
    redraw();
  }
}

function cleanObjects() {
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

  // remove dead mobs
  game.mob.weak.alive = game.mob.weak.alive.filter((mob) => {
    if (mob.health <= 0) {
      return false;
    }
    return true;
  });
}

function keyPressed() {
  // On space key pause the game
  if (keyCode === 32 && !game.gameOver) {
    if (!game.paused) {
      noLoop();
      redraw(); // redraw the canvas to show the pause text
    } else {
      loop();
    }
    game.paused = !game.paused;
  }
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

      mobPeaks = [
        { x: mob.x, y: mob.y },
        { x: mob.x + mob.width, y: mob.y },
        { x: mob.x, y: mob.y + mob.height },
        { x: mob.x + mob.width, y: mob.y + mob.height },
      ];
      if (
        bulletPeaks.some(
          (peak) =>
            peak.x > mob.x &&
            peak.x < mob.x + mob.width &&
            peak.y > mob.y &&
            peak.y < mob.y + mob.height
        ) ||
        mobPeaks.some(
          (peak) =>
            peak.x > bullet.x &&
            peak.x < bullet.x + bullet.width &&
            peak.y > bullet.y &&
            peak.y < bullet.y + bullet.height
        )
      ) {
        game.mob.weak.alive[j].health -= bullet.damage;
        bullets[i].hit = true;
        game.mob.weak.killed++;
      }
    }
  }

  // handle collision between player and mob
  game.mob.weak.alive.forEach((mob) => {
    const mobPeaks = [
      { x: mob.x, y: mob.y },
      { x: mob.x + mob.width, y: mob.y },
      { x: mob.x, y: mob.y + mob.height },
      { x: mob.x + mob.width, y: mob.y + mob.height },
    ];
    const playerPeaks = [
      { x: player.x, y: player.y },
      { x: player.x + player.width, y: player.y },
      { x: player.x, y: player.y + player.height },
      { x: player.x + player.width, y: player.y + player.height },
    ];
    if (
      mobPeaks.some(
        (peak) =>
          peak.x > player.x &&
          peak.x < player.x + player.width &&
          peak.y > player.y &&
          peak.y < player.y + player.height
      ) ||
      playerPeaks.some(
        (peak) =>
          peak.x > mob.x &&
          peak.x < mob.x + mob.width &&
          peak.y > mob.y &&
          peak.y < mob.y + mob.height
      )
    ) {
      // collision detected
      player.health -= mob.damage;
    }
  });
}

/**
 * To keep the player at the center of the screen
 * we move every entity in the opposite direction of the player
 * @param {x, y} param0 movement vector of the player
 */
function moveEveryEntity({ x, y }) {
  // move the mobs
  game.mob.weak.alive.forEach((mob) => {
    mob.x -= x;
    mob.y -= y;
  });

  // move the bullets
  bullets.forEach((bullet) => {
    bullet.x -= x;
    bullet.y -= y;
  });

  moveBackground({ x, y });
}

function startBackgroundMusic() {
  game.music.loop();
  game.music.volume(0.1);
}
