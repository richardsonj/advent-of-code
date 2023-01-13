import Queue from "../../Queue.js";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").reduce(
    (acc, curr) => {
      const match = curr.match(
        /The (\w*) floor contains (?:a (\w+)(?:-compatible)? (\w+)|nothing relevant)(?:(?:, | )+(?:and )?(?:a (\w+)(?:-compatible)? (\w+)))?(?:(?:, )?(?:and )?(?:a (\w+)(?:-compatible)? (\w+)))?(?:(?:, )?(?:and )?(?:a (\w+)(?:-compatible)? (\w+)))?(?:(?:, )?(?:and )?(?:a (\w+)(?:-compatible)? (\w+)))?(?:(?:, )?(?:and )?(?:a (\w+)(?:-compatible)? (\w+)))?(?:(?:, )?(?:and )?(?:a (\w+)(?:-compatible)? (\w+)))?(?:(?:, )?(?:and )?(?:a (\w+)(?:-compatible)? (\w+)))?\./
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
  const seen = new Set();
  const possibleMoves = new Queue();
  possibleMoves.add(
    ...findPossibleMoves(
      { floors: input, elevatorFloor: "first", moveCount: 0, history: [stringify(input, "first")] },
      seen
    )
  );
  let maxMoveCount = 0;
  while (possibleMoves.length > 0) {
    const move = possibleMoves.remove();
    if (move.moveCount > maxMoveCount) {
      maxMoveCount = move.moveCount;
      console.log(`Checking move # ${maxMoveCount}`);
      console.log(`${possibleMoves.length + 1} possible moves`);
    }
    const nextPossibleMoves = findPossibleMoves(move, seen);
    for (const possibleMove of nextPossibleMoves) {
      if (winState(possibleMove.floors)) {
        return possibleMove.moveCount;
      }
    }
    possibleMoves.add(...nextPossibleMoves);
  }
  return undefined;
};

const findPossibleMoves = ({ floors, elevatorFloor, moveCount, history }, seen) => {
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

  const validMoves = [];
  for (const destinationFloor of potentialFloors) {
    for (let item1Index = 0; item1Index < floors[elevatorFloor].length; item1Index++) {
      const item1 = floors[elevatorFloor][item1Index];
      for (let item2Index = item1Index; item2Index < floors[elevatorFloor].length; item2Index++) {
        const item2 = item1Index === item2Index ? undefined : floors[elevatorFloor][item2Index];
        const nextFloors = copyFloors(floors);
        nextFloors[destinationFloor].push(item1);
        nextFloors[elevatorFloor].splice(nextFloors[elevatorFloor].indexOf(item1), 1);
        if (item2) {
          nextFloors[destinationFloor].push(item2);
          nextFloors[elevatorFloor].splice(nextFloors[elevatorFloor].indexOf(item2), 1);
        }
        const stateKey = stringify(nextFloors, destinationFloor);
        if (!invalidGameState(nextFloors) && !seen.has(stateKey)) {
          validMoves.push({
            floors: nextFloors,
            elevatorFloor: destinationFloor,
            moveCount: moveCount + 1,
            history: [...history, stateKey],
          });
          seen.add(stateKey);
        }
      }
    }
  }
  return validMoves;
};

const copyFloors = (floors) => {
  const newFloors = {};
  for (const floor of Object.keys(floors)) {
    newFloors[floor] = [...floors[floor]];
  }
  return newFloors;
};

const invalidGameState = (floors) => {
  for (const floor of Object.values(floors)) {
    for (const item of floor) {
      if (item.type === "microchip") {
        if (
          !floor.some((val) => val.chem === item.chem && val.type === "generator") &&
          floor.some((val) => val.chem !== item.chem && val.type === "generator")
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

const winState = (floors) => {
  return floors.first.length === 0 && floors.second.length === 0 && floors.third.length === 0;
};

const stringify = (floors, elevatorFloor) => {
  let result = "";
  for (const floor of Object.keys(floors)) {
    const floorValues = floors[floor].map((val) => `${val.chem}:${val.type}`);
    floorValues.sort((val1, val2) => val1.localeCompare(val2));
    result += `${floor}:${floorValues.join(",")}`;
  }
  result += `Elevator on: ${elevatorFloor}`;
  return result;
};

export default solution;
