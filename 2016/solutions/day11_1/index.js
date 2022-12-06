const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").reduce(
    (acc, curr) => {
      let match = curr.match(
        /The (\w*) floor contains (?:a (\w+)(?:-compatible)? (\w+)|nothing relevant)(?:(?:, | )+(?:and )?(?:a (\w+)(?:-compatible)? (\w+)))?(?:(?:, )?(?:and )?(?:a (\w+)(?:-compatible)? (\w+)))?(?:(?:, )?(?:and )?(?:a (\w+)(?:-compatible)? (\w+)))?\./
      );
      if (match && match.length > 2) {
        for (let x = 2; x < match.length; x += 2) {
          if (!match[x]) continue;
          acc[match[1]].push({ chem: match[x], type: match[x + 1] });
        }
      }
      return acc;
    },
    {
      first: [],
      second: [],
      third: [],
      fourth: [],
    }
  );
};

const calculateSolution = (input) => {
  return makeMove(input, "first", [], {});
};

const makeMove = (
  floors,
  elevatorFloor,
  history,
  memo = {}
  //best = [Infinity]
) => {
  // if (history.length >= best[0]) {
  //   return Infinity;
  // }

  let stateKey = stringify(floors, elevatorFloor);
  if (invalidGameState(floors)) {
    return Infinity;
  }
  if (history.includes(stateKey + "*")) {
    return undefined;
  }
  if (history.includes(stateKey)) {
    stateKey += "*";
  }
  if (memo[stateKey] !== undefined) {
    //best[0] = Math.min(memo[stateKey] + history.length, best[0])
    return memo[stateKey] + history.length;
  }
  let minMoves = Infinity;

  if (winState(floors)) {
    //best[0] = Math.min(history.length, best[0]);
    memo[stateKey] = 0;
    return history.length;
  }
  let potentialFloors;
  switch (elevatorFloor) {
    case "first":
      potentialFloors = ["second"];
      break;
    case "second":
      potentialFloors = ["third", "first"];
      break;
    case "third":
      potentialFloors = ["fourth", "second"];
      break;
    case "fourth":
      potentialFloors = ["third"];
      break;
  }

  for (let destinationFloor of potentialFloors) {
    for (let item1 of floors[elevatorFloor]) {
      for (let item2 of [undefined, ...floors[elevatorFloor]]) {
        if (item1 === item2) continue;
        let nextFloors = copyFloors(floors);
        nextFloors[destinationFloor].push(item1);
        nextFloors[elevatorFloor].splice(
          nextFloors[elevatorFloor].indexOf(item1),
          1
        );
        if (item2) {
          nextFloors[destinationFloor].push(item2);
          nextFloors[elevatorFloor].splice(
            nextFloors[elevatorFloor].indexOf(item2),
            1
          );
        }
        let nextMinMoves = makeMove(
          nextFloors,
          destinationFloor,
          [...history, stateKey],
          memo
        );
        if (nextMinMoves) {
          minMoves = Math.min(minMoves, nextMinMoves);
        }
      }
    }
  }
  if (memo[stateKey]) {
    memo[stateKey] = Math.min(memo[stateKey], minMoves - history.length);
  } else {
    memo[stateKey] = minMoves - history.length;
  }
  return minMoves;
};

const copyFloors = (floors) => {
  let newFloors = {};
  for (let floor in floors) {
    newFloors[floor] = [...floors[floor]];
  }
  return newFloors;
};

const invalidGameState = (floors) => {
  for (let floor of Object.values(floors)) {
    for (let item of floor) {
      if (item.type === "microchip") {
        if (
          floor.filter(
            (val) => val.chem === item.chem && val.type === "generator"
          ).length === 0 &&
          floor.filter(
            (val) => val.chem !== item.chem && val.type === "generator"
          ).length > 0
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

const winState = (floors) => {
  return (
    floors.first.length === 0 &&
    floors.second.length === 0 &&
    floors.third.length === 0
  );
};

const stringify = (floors, elevatorFloor) => {
  let result = "";
  for (let floor in floors) {
    let floorValues = floors[floor].map((val) => `${val.chem}:${val.type}`);
    floorValues.sort((val1, val2) => val1.localeCompare(val2));
    result += `${floor}:${floorValues.join(",")}`;
  }
  result += `Elevator on: ${elevatorFloor}`;
  return result;
};

export default solution;
