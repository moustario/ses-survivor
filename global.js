const canva = {
  width: window.innerWidth - 4,
  height: window.innerHeight - 4,
  obj: null,
};

const player = {
  width: 46,
  height: 46,
  x: canva.width / 2 - 25,
  y: canva.height / 2 - 25,
  speed: 2,
  imgPath: "./assets/joel.png",
  direction: {
    vx: 0,
    vy: 0,
  },
  health: 100,
};

const game = {
  paused: false,
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
  bullet: {
    imgPath: "./assets/raquette.png",
    // limit around 3
    speed: 2,
    with: 40,
    height: 40,
    lifetime: 900,
    shootingInterval: null,
    shootingIntervalDuration: 2000,
    damage: 5,
  },
};

let bullets = [];

const bulletPatron = {
  imgPath: "./assets/raquette.png",
  speed: 3,
  with: 40,
  height: 40,
  lifetime: 900,
  shootingInterval: null,
  shootingIntervalDuration: 2000,
  damage: 5,
};
