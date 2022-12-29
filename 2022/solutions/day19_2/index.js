const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input.split("\n").map((row) => {
    const match = row.match(
      /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./
    );
    return {
      id: parseInt(match[1]),
      oreRobotCost: parseInt(match[2]),
      clayRobotCost: parseInt(match[3]),
      obsidianRobotCost: [parseInt(match[4]), parseInt(match[5])],
      geodeRobotCost: [parseInt(match[6]), parseInt(match[7])],
    };
  });

const calculateSolution = (input) => {
  let qualityLevel = 1;
  for (const blueprint of input) {
    const [score, choices] = runSimulation(blueprint);
    qualityLevel *= score;
  }
  return qualityLevel;
};

const runSimulation = (blueprint) => {
  const simulationState = {
    minute: 1,
    oreRobotCount: 1,
    clayRobotCount: 0,
    obsidianRobotCount: 0,
    geodeRobotCount: 0,
    oreCount: 0,
    clayCount: 0,
    obsidianCount: 0,
    geodeCount: 0,
    blueprint,
    maxScore: 0,
    maxClayRobots: blueprint.obsidianRobotCost[1],
    maxOreRobots: Math.max(
      blueprint.geodeRobotCost[0],
      blueprint.obsidianRobotCost[0],
      blueprint.oreRobotCost,
      blueprint.clayRobotCost
    ),
    maxObsidianRobots: blueprint.geodeRobotCost[1],
    doNotBuy: [],
  };

  return stepSimulation(simulationState);
};

let simsRun = 0;

const stepSimulation = (state, choices = []) => {
  if (state.minute > 32 || unwinnableState(state)) {
    simsRun++;
    if (simsRun % 1000000 === 0) {
      console.log(`Sims executed: ${simsRun}`);
    }
    return [state.geodeCount, choices];
  }

  const canBuyOreRobot =
    state.oreCount >= state.blueprint.oreRobotCost &&
    state.oreRobotCount < state.maxOreRobots &&
    !state.doNotBuy.has("ore");
  const canBuyClayRobot =
    state.oreCount >= state.blueprint.clayRobotCost &&
    state.clayRobotCount < state.maxClayRobots &&
    !state.doNotBuy.has("clay");
  const canBuyObsidianRobot =
    state.oreCount >= state.blueprint.obsidianRobotCost[0] &&
    state.clayCount >= state.blueprint.obsidianRobotCost[1] &&
    state.obsidianRobotCount < state.maxObsidianRobots &&
    !state.doNotBuy.has("obsidian");
  const canBuyGeodeRobot =
    state.oreCount >= state.blueprint.geodeRobotCost[0] &&
    state.obsidianCount >= state.blueprint.geodeRobotCost[1];
  const possibleMoves = [
    ["buyGeodeRobot", canBuyGeodeRobot],
    ["buyObsidianRobot", canBuyObsidianRobot],
    ["buyClayRobot", canBuyClayRobot],
    ["buyOreRobot", canBuyOreRobot],
    ["doNothing", !canBuyOreRobot || !canBuyClayRobot || !canBuyObsidianRobot || !canBuyGeodeRobot],
  ];

  let maxScore = 0;
  let winningChoices = [];
  for (const option of possibleMoves) {
    if (!option[1]) {
      continue;
    }
    const nextState = generateNextState(option[0], state);

    const [score, finishedChoices] = stepSimulation(nextState, [...choices, option[0]]);
    if (score > maxScore) {
      maxScore = score;
      winningChoices = finishedChoices;
    }
    maxScore = Math.max(maxScore, score);
    state.maxScore = maxScore;
    if (option === "buyGeodeRobot") {
      break;
    }
  }
  return [maxScore, winningChoices];
};

const unwinnableState = (state) => {
  let { geodeCount, geodeRobotCount } = state;
  for (let x = state.minute; x <= 32; x++) {
    geodeCount += geodeRobotCount;
    geodeRobotCount++;
  }
  return geodeCount < state.maxScore;
};

const generateNextState = (option, state) => {
  const nextState = { ...state };
  incrementTime(nextState);
  switch (option) {
    case "buyOreRobot":
      nextState.oreRobotCount++;
      nextState.oreCount -= nextState.blueprint.oreRobotCost;
      nextState.doNotBuy = new Set();
      break;
    case "buyClayRobot":
      nextState.clayRobotCount++;
      nextState.oreCount -= nextState.blueprint.clayRobotCost;
      nextState.doNotBuy = new Set();
      break;
    case "buyObsidianRobot":
      nextState.obsidianRobotCount++;
      nextState.oreCount -= nextState.blueprint.obsidianRobotCost[0];
      nextState.clayCount -= nextState.blueprint.obsidianRobotCost[1];
      nextState.doNotBuy = new Set();
      break;
    case "buyGeodeRobot":
      nextState.geodeRobotCount++;
      nextState.oreCount -= nextState.blueprint.geodeRobotCost[0];
      nextState.obsidianCount -= nextState.blueprint.geodeRobotCost[1];
      nextState.doNotBuy = new Set();
      break;
    default:
      nextState.doNotBuy = new Set(state.doNotBuy);
      if (state.oreCount >= state.blueprint.oreRobotCost) {
        nextState.doNotBuy.add("ore");
      }
      if (state.oreCount >= state.blueprint.clayRobotCost) {
        nextState.doNotBuy.add("clay");
      }
      if (
        state.oreCount >= state.blueprint.obsidianRobotCost[0] &&
        state.clayCount >= state.blueprint.obsidianRobotCost[1]
      ) {
        nextState.doNotBuy.add("obsidian");
      }
  }
  return nextState;
};

const incrementTime = (state) => {
  state.minute += 1;
  state.oreCount += state.oreRobotCount;
  state.clayCount += state.clayRobotCount;
  state.obsidianCount += state.obsidianRobotCount;
  state.geodeCount += state.geodeRobotCount;
};

export default solution;
