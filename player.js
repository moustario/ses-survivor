function loadPlayer() {
  player.img = loadImage(player.imgPath);
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
  const v = { x: 0, y: 0 };
  // Player movement
  if (keyIsDown(LEFT_ARROW)) {
    v.x = -player.speed;
    if (keyIsDown(UP_ARROW)) {
      v.x = -player.speed * 0.7;
      v.y = -player.speed * 0.7;
    } else if (keyIsDown(DOWN_ARROW)) {
      v.x = -player.speed * 0.7;
      v.y = +player.speed * 0.7;
    }
  } else if (keyIsDown(RIGHT_ARROW)) {
    v.x += player.speed;
    if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
      v.x = +player.speed * 0.7;
      v.y = -player.speed * 0.7;
    } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)) {
      v.x = +player.speed * 0.7;
      v.y = +player.speed * 0.7;
    }
  } else if (keyIsDown(UP_ARROW)) {
    v.y = -player.speed;
  } else if (keyIsDown(DOWN_ARROW)) {
    v.y = +player.speed;
  }
  moveEveryEntity(v);
}
