const healthBar = {
  width: canva.width,
  height: 50,
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
