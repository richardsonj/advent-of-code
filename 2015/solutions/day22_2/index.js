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
  return simulate(boss);
};

const simulate = (boss) => {
  let spells = [
    { cost: 53, damage: 4, key: "magicMissile" },
    { cost: 73, damage: 2, heal: 2, key: "drain" },
    { cost: 113, armor: 7, duration: 6, key: "shield" },
    { cost: 173, damage: 3, duration: 6, key: "poison" },
    { cost: 229, mana: 101, duration: 5, key: "recharge" },
  ];

  let player = {
    "Hit Points": 50,
    armor: 0,
    mana: 500,
    effectStates: [],
    activeEffects: [],
    manaSpent: 0,
  };

  return simulateTurn(player, boss, spells, []);
};

let minMana = Infinity;

let simulateTurn = (player, boss, spells, spellHistory) => {
  let [nextPlayer, nextBoss] = copyContestants(player, boss);
  
  nextPlayer["Hit Points"]--;
  if (nextPlayer["Hit Points"] <= 0) {
    return Infinity;
  }

  handleEffects(nextPlayer, nextBoss);

  if (nextBoss["Hit Points"] <= 0) {
    return Math.min(nextPlayer.manaSpent, minMana);
  }
  for (let spell of spells) {
    if (nextPlayer.manaSpent + spell.cost > minMana){
      continue;
    }
    let [nextNextPlayer, nextNextBoss] = copyContestants(nextPlayer, nextBoss);
    if (
      nextNextPlayer.activeEffects.includes(spell.key) ||
      nextNextPlayer.mana - spell.cost < 0
    ) {
      continue;
    }
    applySpell(spell, nextNextPlayer, nextNextBoss);

    if (nextNextBoss["Hit Points"] <= 0) {
      return Math.min(nextNextPlayer.manaSpent, minMana);
    }

    handleEffects(nextNextPlayer, nextNextBoss);

    if (nextNextBoss["Hit Points"] <= 0) {
      return Math.min(nextNextPlayer.manaSpent, minMana);
    }

    nextNextPlayer["Hit Points"] -=
      nextNextBoss.Damage - nextNextPlayer.armor || 1;
    if (nextNextPlayer["Hit Points"] <= 0) {
      return Infinity;
    }
    minMana = Math.min(
      minMana,
      simulateTurn(nextNextPlayer, nextNextBoss, spells, [
        ...spellHistory,
        spell.key, minMana
      ])
    );
  }
  return minMana;
};

// Magic Missile costs 53 mana. It instantly does 4 damage.
// Drain costs 73 mana. It instantly does 2 damage and heals you for 2 hit points.
// Shield costs 113 mana. It starts an effect that lasts for 6 turns. While it is active, your armor is increased by 7.
// Poison costs 173 mana. It starts an effect that lasts for 6 turns. At the start of each turn while it is active, it deals the boss 3 damage.
// Recharge costs 229 mana. It starts an effect that lasts for 5 turns. At the start of each turn while it is active, it gives you 101 new mana.

function applySpell(spell, player, boss) {
  if (spell.duration) {
    player.effectStates.push({ ...spell });
    player.activeEffects.push(spell.key);
  } else {
    if (spell.damage) {
      boss["Hit Points"] -= spell.damage;
    }
    if (spell.heal) {
      player["Hit Points"] += spell.heal;
    }
  }
  player.manaSpent += spell.cost;
  player.mana -= spell.cost;
}

function copyContestants(player, boss) {
  let nextPlayer = { ...player };
  nextPlayer.effectStates = [];
  for (let effect of player.effectStates) {
    nextPlayer.effectStates.push({ ...effect });
  }
  nextPlayer.activeEffects = [...player.activeEffects];
  let nextBoss = { ...boss };
  return [nextPlayer, nextBoss];
}

function handleEffects(player, boss) {
  player.armor = 0;
  for (let effect of player.effectStates) {
    if (effect.armor) {
      player.armor = effect.armor;
    }
    if (effect.damage) {
      boss["Hit Points"] -= effect.damage;
    }
    if (effect.mana) {
      player.mana += effect.mana;
    }
    effect.duration--;
  }

  for (let effect of [...player.effectStates]) {
    if (!effect.duration) {
      player.activeEffects = player.activeEffects.filter(
        (val) => val !== effect.key
      );
      player.effectStates = player.effectStates.filter(
        (val) => val.key !== effect.key
      );
    }
  }
}

export default solution;
