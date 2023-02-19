const background = {
  basicTile: {
    imgPath: "./assets/floor/floor.png",
    img: null,
    tileWidth: 50,
    tileHeight: 50,
    offset: {
      x: 0,
      y: 0,
    },
  },
};

function loadBackGround() {
  background.basicTile.img = loadImage(background.basicTile.imgPath);
}

function drawBackground() {
  // repeat the background image to fill the screen
  startingPosition = {
    x: Number(background.basicTile.offset.x) - background.basicTile.tileWidth,
    y: Number(background.basicTile.offset.y) - background.basicTile.tileHeight,
  };

  for (
    let x = startingPosition.x;
    x < width;
    x += background.basicTile.tileWidth
  ) {
    for (
      let y = startingPosition.y;
      y < height;
      y += background.basicTile.tileHeight
    ) {
      image(background.basicTile.img, x, y);
    }
  }
}

function moveBackground({ x, y }) {
  // move the background, using the offset between 0 and the tile size
  background.basicTile.offset.x =
    (background.basicTile.offset.x - x) % background.basicTile.tileWidth;
  background.basicTile.offset.y =
    (background.basicTile.offset.y - y) % background.basicTile.tileHeight;
}
