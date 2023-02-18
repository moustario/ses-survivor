const canva = {
  width: 800,
  height: 500,
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
};

const game = {
  paused: false,
  music: null,
  mob: {
    weak: {
      alive: [],
      killed: 0,
      spawnIntervalDuration: 1000,
      spawnInterval: null,
      imgPath: "./assets/akon.png",
      width: 25,
      height: 35,
      speed: 1,
      radiusFromPlayer: 450,
      overlap: 0.6, // percentage of overlap between mobs
      health: 5,
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
  ui: {
    lifeBar: {
      width: canva.width,
      height: 50,
    },
    pause: {
      text: "PAUSE",
      textSize: 50,
      textFont: "Arial",
      textColor: [255, 168, 0],
      x: 20,
      y: 80,
    },
  },
  bullet: {
    imgPath: "./assets/raquette.png",
    speed: 3,
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
