const day17_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  let match = input.match(
    /target area: x=([\-0-9]*)..([\-0-9]*), y=([\-0-9]*)..-([\-0-9]*)/
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
  let maxDeltaX = findOptimalDeltaX(targetArea.right);

  let maxYPos = 0;

  for (let deltaX = minDeltaX; deltaX <= maxDeltaX; deltaX++) {
    let deltaY = 1;
    let lastY = -999;
    let lastX = 0;
    while (lastY < targetArea.top && lastY > -1000) {
      let [result, maxY, finalPos] = calculateHit(deltaX, deltaY, targetArea);
      lastX = finalPos.x;
      lastY = finalPos.y;
      if (result) maxYPos = Math.max(maxY, maxYPos);
      deltaY++;
    }
  }

  return maxYPos;
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
  let maxYPos = 0;
  while (
    pos.y > targetArea.bottom ||
    (deltaY > 0 && !isInTargetArea(pos, targetArea))
  ) {
    [deltaX, deltaY, pos] = simulateStep(deltaX, deltaY, pos);
    maxYPos = Math.max(maxYPos, pos.y);
  }

  return [isInTargetArea(pos, targetArea), maxYPos, pos];
};

const simulateStep = (deltaX, deltaY, pos) => {
  pos.x += deltaX;
  pos.y += deltaY;
  deltaY -= 1;
  if (deltaX > 0) deltaX--;
  if (deltaX < 0) deltaX++;
  return [deltaX, deltaY, pos];
};

export default day17_1;
function isInTargetArea(pos, targetArea) {
  return (
    pos.x >= targetArea.left &&
    pos.x <= targetArea.right &&
    pos.y <= targetArea.top &&
    pos.y >= targetArea.bottom
  );
}
