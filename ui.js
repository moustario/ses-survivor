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

const score = {
  text: "☠",
  textSize: 25,
  textFont: "Arial",
  textColor: [255, 255, 255],
  x: (canva.width / 3) * 2,
  y: 20,
};

const timer = {
  text: "⏱",
  textSize: 35,
  textFont: "Arial",
  textColor: [255, 255, 255],
  x: canva.width / 2,
  y: 20,
};

const gameOver = {
  text: "GAME OVER",
  textSize: 50,
  textFont: "Arial",
  textColor: [255, 0, 0],
  x: canva.width / 2,
  y: canva.height / 3,
  randomPhrase: null,
  gifPaths: [
    "https://media.giphy.com/media/cr9vIO7NsP5cY/giphy.gif",
    "https://media.giphy.com/media/kC2PWmThZBlxvLDCcM/giphy.gif",
    "https://media.giphy.com/media/RIq0RkhPWNd6nEVyIY/giphy.gif",
    "https://media.giphy.com/media/SskdP9VDYtJzIsHiTg/giphy.gif",
    "https://media.giphy.com/media/5txB9OelgMD46JG6gM/giphy.gif",
    "https://media.giphy.com/media/HQP9fsiDWa9Rm/giphy.gif",
    "https://media.giphy.com/media/4G0NOsv1S5O5Lk9kxY/giphy.gif",
    "https://media.giphy.com/media/jx58M3jM8Gu7Fxv0gz/giphy.gif",
    "https://media.giphy.com/media/tE6yuUPFpbM7v8Y1qU/giphy.gif",
    "https://media.giphy.com/media/B7p42EfUKORuHh4RgJ/giphy.gif",
    "https://media.giphy.com/media/10CopumcRWLMYM/giphy.gif",
    "https://media.giphy.com/media/3oFzmko6SiknmpR2NO/giphy.gif",
    "https://media.giphy.com/media/rKj0oXtnMQNwY/giphy.gif",
    "https://media.giphy.com/media/pK6k4BNalmx44CQj3v/giphy.gif",
    "https://media.giphy.com/media/F3BeiZNq6VbDwyxzxF/giphy.gif",
    "https://media.giphy.com/media/Bcpspr9LTSvss/giphy.gif",
    "https://media.giphy.com/media/ZCCERtxEH01ksB2tXu/giphy.gif",
    "https://media.giphy.com/media/3og0INyCmHlNylks9O/giphy.gif",
    "https://media.giphy.com/media/IIWTw2Foef89a/giphy.gif",
    "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",
    "https://media.giphy.com/media/UkPqBz1MFRdBtXybRZ/giphy.gif",
    "https://media.giphy.com/media/ESzxkrVH853WoBiBgP/giphy.gif",
    "https://media.giphy.com/media/yUscqyw0M6wFxviJLj/giphy.gif",
    "https://media.giphy.com/media/OsMOmDsJzKayJnMy7x/giphy.gif",
    "https://media.giphy.com/media/3owvKeQX8XsoaFkXGU/giphy.gif",
  ],
  loserPhrases: [
    "Your mom is so fat, she can't even jump to the next level!",
    "You're such a loser, you probably can't even do a do mineur.",
    "Git good looser",
    "You're so bad, you probably invented yourself a wife.",
    "You're so bad, every time you commit you change the public IP",
    "'...'",
    "Can't you do a little better than 'this'?",
    "Wow you must be really bad at squash",
    "You're so bad, you did 6 commit called 'oups'",
  ],
};

function drawUI() {
  drawScore();
  drawHealthBar();
  drawTimer();
  if (game.paused) {
    drawPause();
  }
  if (game.gameOver) {
    drawGameOver();
  }
}

function loadUI() {
  // choose 2 random gif to display
  // choose a random loser phrase
  // set the random gif and phrase to the gameOver object
  gameOver.randomGif1 = createImg(random(gameOver.gifPaths));
  gameOver.randomGif1.hide();
  gameOver.randomPhrase = random(gameOver.loserPhrases);
}

function drawPause() {
  fill(pause.textColor);
  textAlign(CENTER, CENTER);
  textSize(pause.textSize);
  text(pause.text, pause.x, pause.y);
}

function drawScore() {
  fill(score.textColor);
  textAlign(CENTER, CENTER);
  textSize(score.textSize);
  text(game.mob.weak.killed + " " + score.text, score.x, score.y);
}

function drawTimer() {
  fill(timer.textColor);
  textAlign(CENTER, CENTER);
  textSize(timer.textSize);
  const timeSpendinGame = millis() - game.startingTime;
  const minutes = floor(timeSpendinGame / 1000 / 60);
  const seconds = floor(timeSpendinGame / 1000) % 60;
  const timeString = minutes + ":" + seconds;
  text(timeString, timer.x, timer.y);
}

function drawHealthBar() {
  // draw the health bar background
  fill(healthBar.backgroundColor);
  rect(healthBar.x, healthBar.y, healthBar.width, healthBar.height);

  // draw the health bar, based on the player's health
  healthWith = (player.health / player.maxHealth) * healthBar.width;
  // clamp width to 0 and healthBar.width
  healthWith = constrain(healthWith, 0, healthBar.width);
  fill(healthBar.color);
  rect(healthBar.x, healthBar.y, healthWith, healthBar.height);
}

function drawGameOver() {
  fill(gameOver.textColor);
  textAlign(CENTER, CENTER);
  textSize(gameOver.textSize);
  text(gameOver.text, gameOver.x, gameOver.y);

  // draw a random gif centered on the screen
  gameOver.randomGif1.size(200, 200);
  gameOver.randomGif1.position(
    gameOver.x - 100,
    gameOver.y + gameOver.textSize * 3
  );
  gameOver.randomGif1.show();

  // draw a random loser phrase
  fill(gameOver.textColor);
  textAlign(CENTER, CENTER);
  textSize(gameOver.textSize * 0.6);
  text(gameOver.randomPhrase, gameOver.x, gameOver.y + gameOver.textSize);

  // reset text alignment
  textAlign(LEFT, TOP);
}
