const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n")
    .map((row) => row.match(/Sensor at x=(-?[0-9]+), y=(-?[0-9]+): closest beacon is at x=(-?[0-9]+), y=(-?[0-9]+)/))
    .map((match) => ({ sensor: [parseInt(match[1]), parseInt(match[2])], beacon: [parseInt(match[3]), parseInt(match[4])] }));
};

const calculateSolution = (input) => {
  const xCoords = input.flat(1)
    .map(coord => [coord.sensor[0] - manhattanDistance(coord),
    coord.sensor[0] + manhattanDistance(coord),
    coord.beacon[0] - manhattanDistance(coord),
    coord.beacon[0] + manhattanDistance(coord)
    ]).flat();
  const yCoords = input.flat(1)
    .map(coord => [
      coord.sensor[1] - manhattanDistance(coord),
      coord.sensor[1] + manhattanDistance(coord),
      coord.beacon[1] - manhattanDistance(coord),
      coord.beacon[1] + manhattanDistance(coord)
    ]).flat();
  const xRange = [Math.min(...xCoords), Math.max(...xCoords)];
  const yRange = [Math.min(...yCoords), Math.max(...yCoords)];
  const width = xRange[1] - xRange[0] + 1;

  const grid = new Array(width).fill(".");

  const targetRow = 2000000 - yRange[0];

  for (let pair of input) {
    normalizePair(pair, xRange[0], yRange[0]);
    console.log(JSON.stringify(pair));
    if (pair.sensor[1] === targetRow) {
      grid[pair.sensor[0]] = "S";
    }
    if (pair.beacon[1] === targetRow) {
      grid[pair.beacon[0]] = "B";
    }
    const distance = manhattanDistance(pair);
    if ((pair.sensor[1] + distance) < targetRow || (pair.sensor[1] - distance) > targetRow) {
      continue;
    }
    for (let x = pair.sensor[0] - distance; x <= pair.sensor[0] + distance; x++) {
      const remainingDistance = distance - Math.abs(pair.sensor[0] - x);
      if ((pair.sensor[1] < targetRow && pair.sensor[1] + remainingDistance >= targetRow) || (pair.sensor[1] > targetRow && pair.sensor[1] - remainingDistance <= targetRow)) {
          if (grid[x] === ".") {
            grid[x] = "#";
          }
      }
    }
  }
  let count = 0;
  for (let x = 0; x < width; x++) {
    const val = grid[x];
    if (val === 'S' || val === '#') {
      count++;
    }
  }
  return count;
};

function manhattanDistance(pair) {
  return Math.abs(pair.beacon[0] - pair.sensor[0]) + Math.abs(pair.beacon[1] - pair.sensor[1]);
}

function normalizePair(pair, xMin, yMin) {
  pair.sensor[0] -= xMin;
  pair.sensor[1] -= yMin;
  pair.beacon[0] -= xMin;
  pair.beacon[1] -= yMin;
}

export default solution;
