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
  const width = 4000000;
  const grid = [];
  for (let x = 0; x < width; x++) {
    grid.push([[0, width-1]]);
  }

  for (let pair of input) {
    console.log(JSON.stringify(pair));
    const distance = manhattanDistance(pair);

    for (let x = Math.max(pair.sensor[0] - distance, 0); x <= Math.min(pair.sensor[0] + distance, width-1); x++) {
      const remainingDistance = distance - Math.abs(pair.sensor[0] - x);
      const yRange = [Math.max(pair.sensor[1]-remainingDistance, 0), Math.min(pair.sensor[1]+remainingDistance, width-1)];
      grid[x] = removeRange(grid[x], yRange);
    }
  }
  for (let rowIndex in grid) {
    if (grid[rowIndex].length) {
      return rowIndex * width + grid[rowIndex][0][0]
    }
  }
};

function removeRange(ranges, yRange) {
  const newRanges = [];
  for (let range of ranges) {
    if (range[0] < yRange[0]){
      if (range[1] < yRange[0]) {
        newRanges.push(range);
        continue;
      }
      if (range[1] <= yRange[1]) {
        newRanges.push([range[0], yRange[0]-1]);
      }
      if (range[1] > yRange[1]) {
        newRanges.push([range[0], yRange[0]-1]);
        newRanges.push([yRange[1]+1, range[1]])
      }
    } else if (range[0] === yRange[0]) {
      if (range[1] > yRange[1]) {
        newRanges.push([yRange[1] + 1, range[1]])
      }
    } else if (range[0] > yRange[0]) {
      if (range[0] > yRange[1]) {
        newRanges.push(range);
        continue;
      }
      if (range[1] > yRange[1]) {
        newRanges.push([yRange[1]+1, range[1]])
      }
    }
  }
  return newRanges;
}

function manhattanDistance(pair) {
  return Math.abs(pair.beacon[0] - pair.sensor[0]) + Math.abs(pair.beacon[1] - pair.sensor[1]);
}

export default solution;
