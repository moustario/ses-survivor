const healthBar = {
  // right under the player sprite
  x: player.x,
  y: player.y + player.height + 10,
  width: player.width,
  height: 5,
  backgroundColor: [0, 0, 0],
  color: [255, 0, 0],
};

const pause = {
  text: "PAUSE",
  textSize: 50,
  textFont: "Arial",
  textColor: [255, 168, 0],
  x: canva.width / 2,
  y: canva.height / 3,
};

function drawUI() {
  drawHealthBar();
  if (game.paused) {
    drawPause();
  }
}

function drawPause() {
  fill(pause.textColor);
  textAlign(CENTER, CENTER);
  textSize(pause.textSize);
  text(pause.text, pause.x, pause.y);
}

function drawHealthBar() {
  // draw the health bar background
  fill(healthBar.backgroundColor);
  rect(healthBar.x, healthBar.y, healthBar.width, healthBar.height);

  // draw the health bar, based on the player's health
  healthWith = (player.health / player.maxHealth) * healthBar.width;
  // clamp width to 0 and healthBar.width
  healthWith = constrain(healthWith, 0, healthBar.width);
  console.log(healthWith);
  fill(healthBar.color);
  rect(healthBar.x, healthBar.y, healthWith, healthBar.height);
}
