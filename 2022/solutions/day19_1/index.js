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
  let qualityLevel = 0;
  for (const blueprint of input) {
    const [score, choices] = runSimulation(blueprint);
    qualityLevel += score * blueprint.id;
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
    // maxClayRobots: Math.floor((24 - 2 - blueprint.geodeRobotCost[1]) / blueprint.clayRobotCost),
    // maxOreRobots:
    //   Math.floor(
    //     (24 - 3 - blueprint.geodeRobotCost[1] - blueprint.obsidianRobotCost[1]) /
    //       blueprint.oreRobotCost
    //   ) + 1,
  };

  return stepSimulation(simulationState);
};

let simsRun = 0;

const stepSimulation = (state, choices = []) => {
  if (state.minute > 24 || unwinnableState(state)) {
    simsRun++;
    if (simsRun % 1000000 === 0) {
      console.log(`Sims executed: ${simsRun}`);
    }
    return [state.geodeCount, choices];
  }
  // const minOreCost = Math.min(state.blueprint.oreRobotCost,
  //   state.blueprint.clayRobotCost,
  //   state.blueprint.obsidianRobotCost[0],
  //   state.blueprint.geodeRobotCost[0]);
  // while (minOreCost > state.oreCount && state.minute <= 23) {
  //   incrementTime(state);
  // }

  const canBuyOreRobot =
    state.oreCount >= state.blueprint.oreRobotCost && state.oreRobotCount < state.maxOreRobots;
  const canBuyClayRobot =
    state.oreCount >= state.blueprint.clayRobotCost && state.clayRobotCount < state.maxClayRobots;
  const canBuyObsidianRobot =
    state.oreCount >= state.blueprint.obsidianRobotCost[0] &&
    state.clayCount >= state.blueprint.obsidianRobotCost[1];
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
  const geodeCutoff = 24 - state.maxScore;
  const obsidianCutoff = geodeCutoff - 1;
};

const generateNextState = (option, state) => {
  const nextState = { ...state };
  incrementTime(nextState);
  switch (option) {
    case "buyOreRobot":
      nextState.oreRobotCount++;
      nextState.oreCount -= nextState.blueprint.oreRobotCost;
      break;
    case "buyClayRobot":
      nextState.clayRobotCount++;
      nextState.oreCount -= nextState.blueprint.clayRobotCost;
      break;
    case "buyObsidianRobot":
      nextState.obsidianRobotCount++;
      nextState.oreCount -= nextState.blueprint.obsidianRobotCost[0];
      nextState.clayCount -= nextState.blueprint.obsidianRobotCost[1];
      break;
    case "buyGeodeRobot":
      nextState.geodeRobotCount++;
      nextState.oreCount -= nextState.blueprint.geodeRobotCost[0];
      nextState.obsidianCount -= nextState.blueprint.geodeRobotCost[1];
      break;
  }
  return nextState;
};

// const minPredictedOutput = (state) => {
//   const pState = { ...state };
//   if (!pState.clayRobotCount) {
//     const minutesForClayRobot = Math.ceil((pState.blueprint.clayRobotCost - pState.oreCount) / pState.oreRobotCount);
//     for (let x = 0; x <= minutesForClayRobot; x++) {
//       incrementTime(pState);
//     }
//     pState.clayRobotCount += 1;
//     pState.oreCount -= pState.blueprint.clayRobotCost;
//   }
//   if (!pState.obsidianRobotCount) {
//     const minutesForObsidianRobot = Math.max(
//       Math.ceil((pState.blueprint.obsidianRobotCost[1] - pState.clayCount) / pState.clayRobotCount),
//       Math.ceil((pState.blueprint.obsidianRobotCost[0] - pState.oreCount) / pState.oreRobotCount));
//       for (let x = 0; x <= minutesForObsidianRobot; x++) {
//         incrementTime(pState);
//       }
//     pState.obsidianRobotCount += 1;
//     pState.clayCount -= pState.blueprint.obsidianRobotCost[1];
//     pState.oreCount -= pState.blueprint.obsidianRobotCost[0];
//   }
//   if (!pState.geodeRobotCount) {
//     const minutesForGeodeRobot = Math.max(
//       Math.ceil((pState.blueprint.geodeRobotCost[1] - pState.obsidianCount) / pState.obsidianRobotCount),
//       Math.ceil((pState.blueprint.geodeRobotCost[0] - pState.oreCount) / pState.oreRobotCount));
//       for (let x = 0; x <= minutesForGeodeRobot; x++) {
//         incrementTime(pState);
//       }
//     pState.geodeRobotCount += 1;
//     pState.obsidianCount -= pState.blueprint.geodeRobotCost[1];
//     pState.oreCount -= pState.blueprint.geodeRobotCost[0];
//   }
//   return (24-pState.minute) * pState.geodeRobotCount;
// }

const incrementTime = (state) => {
  state.minute += 1;
  state.oreCount += state.oreRobotCount;
  state.clayCount += state.clayRobotCount;
  state.obsidianCount += state.obsidianRobotCount;
  state.geodeCount += state.geodeRobotCount;
};

export default solution;
