const healthBar = {
  width: canva.width,
  height: 50,
};

const pause = {
  text: "PAUSE",
  textSize: 50,
  textFont: "Arial",
  textColor: [255, 168, 0],
  x: 20,
  y: 80,
};

function drawUI() {
  if (game.paused) {
    drawPause();
  }
}

function drawPause() {
  fill(pause.textColor);
  textSize(pause.textSize);
  text(pause.text, pause.x, pause.y);
}
