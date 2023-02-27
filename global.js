const canva = {
  width: document.documentElement.scrollWidth - 20,
  height: document.documentElement.scrollHeight - 20,
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
  xp: 0,
  xpToNextLevel: 10,
  level: 1,
  increaseFactor: 1.5,
  pickupRadius: 20,
  addXp: function (xp) {
    console.log("adding", this.xp);
    this.xp += xp;
    if (this.xp >= this.xpToNextLevel) {
      game.levelUp = true;
      this.xp -= this.xpToNextLevel;
      this.computenextLevelXp();
    }
  },
  computenextLevelXp: function () {
    console.log("this.xpToNextLevel", this.xpToNextLevel);
    this.xpToNextLevel = this.increaseFactor * this.xpToNextLevel;
    console.log("this.xpToNextLevel", this.xpToNextLevel);
  },
};

const game = {
  paused: false,
  gameOver: false,
  levelUp: false,
  music: null,
  startingTime: null,
  offTime: 0,
  lastOffTimeStart: null,
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
  xpPickups: [],
};

let bullets = [];

function gameIsRunning() {
  return !game.gameOver && !game.paused && !game.levelUp;
}
