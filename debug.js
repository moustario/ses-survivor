const killAllMobs = () => {
  game.mob.weak.alive = game.mob.weak.alive.map((e) => {
    e.health = 0;
    return e;
  });
};

const spawnPlentyXp = (amount) => {
  for (let i = 0; i < amount; i++) {
    // create new mob
    spawnMob(mobPatron.weak);
  }
  killAllMobs();
};
