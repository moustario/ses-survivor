const xpPickups = {
  imgPath: "./assets/xp_2.png",
  img: null,
  width: 40,
  height: 40,
  x: null,
  y: null,
  angle: 0,
  draw: function () {
    // rotate the image
    this.angle += 0.05;
    const centerOfImage = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
    push();
    translate(centerOfImage.x, centerOfImage.y);
    imageMode(CENTER);
    rotate(this.angle);
    image(this.img, 0, 0, this.width, this.height);
    pop();
  },
  value: 1,
  pickupRadius: null,
};

function drawPickups() {
  // draw xp pickups
  game.xpPickups.forEach((xpPickup) => {
    xpPickup.draw();
  });
}
