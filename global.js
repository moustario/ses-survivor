const canva = {
  width: window.innerWidth - 4,
  height: window.innerHeight - 4,
  obj: null,
};

const player = {
  width: 46,
  height: 46,
  x: canva.width / 2 - 23,
  y: canva.height / 2 - 23,
  speed: 2,
  imgPath: "./assets/joel.png",
  direction: {
    vx: 0,
    vy: 0,
  },
  health: 1000,
  maxHealth: 1000,
};

const game = {
  paused: false,
  gameOver: false,
  music: null,
  mob: {
    weak: {
      alive: [],
      killed: 0,
      spawnInterval: null,
    },
  },
  effects: {
    backgroundMusicPath: "./assets/background.mp3",
    bulletSound: null,
    bulletSoundPath: "./assets/tennis_ball.mp3",
    soundTimeout: 300,
  },
  background: {
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

let bullets = [];

function gameIsRunning() {
  return !game.gameOver && !game.paused;
}
