const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").reduce((acc, curr) => {
    const [key, value] = curr.split(": ");
    acc[key] = value;
    return acc;
  }, {});
};

const calculateSolution = (boss) => {
  let weapons = [
    { cost: 8, damage: 4 },
    { cost: 10, damage: 5 },
    { cost: 25, damage: 6 },
    { cost: 40, damage: 7 },
    { cost: 74, damage: 8 },
  ];

  let armors = [
    { cost: 0, armor: 0 },
    { cost: 13, armor: 1 },
    { cost: 31, armor: 2 },
    { cost: 53, armor: 3 },
    { cost: 75, armor: 4 },
    { cost: 102, armor: 5 },
  ];

  let rings = [
    { cost: 0, damage: 0 },
    { cost: 0, damage: 0 },
    { cost: 20, armor: 1 },
    { cost: 25, damage: 1 },
    { cost: 40, armor: 2 },
    { cost: 50, damage: 2 },
    { cost: 80, armor: 3 },
    { cost: 100, damage: 3 },
  ];

  let minCost = Infinity;

  for (let weapon of weapons) {
    for (let armor of armors) {
      for (let ring1 of rings) {
        for (let ring2 of rings) {
          if (ring1 === ring2) {
            continue;
          }
          if (simulate([weapon, armor, ring1, ring2], boss)) {
            minCost = Math.min(
              minCost,
              [weapon, armor, ring1, ring2].reduce(
                (acc, curr) => acc + curr.cost,
                0
              )
            );
          }
        }
      }
    }
  }
  return minCost;
};

const simulate = (equipment, boss) => {
  let armor = equipment.reduce((acc, curr) => acc + (curr.armor || 0), 0);
  let damage = equipment.reduce((acc, curr) => acc + (curr.damage || 0), 0);

  let player = { "Hit Points": 100, Armor: armor, Damage: damage };
  boss = {...boss};

  while (true) {
    boss["Hit Points"] -= player.Damage - boss.Armor || 1;
    if (boss["Hit Points"] <= 0) return true;
    player["Hit Points"] -= boss.Damage - player.Armor || 1;
    if (player["Hit Points"] <= 0) return false;
  }
};

export default solution;
