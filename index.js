let canva = {
  background: "#b2b2b2",
  width: 800,
  height: 440
}

let player = {
  width: 50,
  height: 50,
  x: 10,
  y: 10,
  speed: 2,
  direction: 'down',
  imgPath: './assets/joel.png',
};

let bulletPatron = {
  imgPath: './assets/raquette.png',
  speed: 3,
  with: 40,
  height: 40,
  lifetime: 800,
}

let bullets = [];

let gamePaused = false;

function setup() {
  createCanvas(canva.width, canva.height);
  background(canva.background);
  player.img = loadImage(player.imgPath);
  bulletPatron.img = loadImage(bulletPatron.imgPath);
}

function draw() {
  background(canva.background);
  drawPlayer();

  playerControls();
  drawBullets();

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
    player.direction = 'left';
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.x += player.speed;
    player.direction = 'right';
  } else if (keyIsDown(UP_ARROW)) {
    player.y -= player.speed;
    player.direction = 'up';
  } else if (keyIsDown(DOWN_ARROW)) {
    player.y += player.speed;
    player.direction = 'down';
  }
}

function drawBullets() {
  bullets.forEach((bullet) => {
    if (bullet.direction === 'left') {
      bullet.x -= bulletPatron.speed;
    } else if (bullet.direction === 'right') {
      bullet.x += bulletPatron.speed;
    } else if (bullet.direction === 'up') {
      bullet.y -= bulletPatron.speed;
    } else if (bullet.direction === 'down') {
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
  if (keyCode === 27 && !gamePaused) {
    drawPause();
    noLoop();
    console.log('game paused');
    gamePaused = true;
  } else if (keyCode === 27 && gamePaused) {
    loop();
    console.log('game resumed');
    gamePaused = false;
  }
}

function drawPause() {
  fill(255, 0, 0);
  textSize(32);
  text('Game paused', 10, 30);
}
