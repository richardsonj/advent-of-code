const day17_2 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  let match = input.match(
    /target area: x=([\-0-9]*)..([\-0-9]*), y=([\-0-9]*)..([\-0-9]*)/
  );
  return {
    left: parseInt(match[1]),
    right: parseInt(match[2]),
    bottom: parseInt(match[3]),
    top: parseInt(match[4]),
  };
};

const calculateSolution = (targetArea) => {
  let minDeltaX = findOptimalDeltaX(targetArea.left);
  let maxDeltaX = findOptimalDeltaX(targetArea.right) + 500;

  let maxYPos = 0;
  let count = 0;

  for (let deltaX = minDeltaX; deltaX <= maxDeltaX; deltaX++) {
    let deltaY = targetArea.bottom;
    while (deltaY < 1000) {
      let [result, maxY, finalPos] = calculateHit(deltaX, deltaY, targetArea);
      if (result) {
        count++; 
      }
      deltaY++;
    }
  }

  return count;
};

const findOptimalDeltaX = (x) => {
  let candidate = 1;
  while (candidate <= x) {
    x -= candidate;
    candidate++;
  }

  return candidate;
};

const calculateHit = (deltaX, deltaY, targetArea) => {
  let pos = { x: 0, y: 0 };
  while (
    (pos.y > targetArea.bottom || deltaY > 0) &&
    !isInTargetArea(pos, targetArea)
  ) {
    [deltaX, deltaY, pos] = simulateStep(deltaX, deltaY, pos);
  }

  return [isInTargetArea(pos, targetArea), 0, pos];
};

const simulateStep = (deltaX, deltaY, pos) => {
  pos.x += deltaX;
  pos.y += deltaY;
  deltaY -= 1;
  if (deltaX > 0) deltaX--;
  if (deltaX < 0) deltaX++;
  return [deltaX, deltaY, pos];
};

export default day17_2;
function isInTargetArea(pos, targetArea) {
  return (
    pos.x >= targetArea.left &&
    pos.x <= targetArea.right &&
    pos.y <= targetArea.top &&
    pos.y >= targetArea.bottom
  );
}
