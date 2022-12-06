const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => {
    let match = line.match(
      /(turn on|turn off|toggle) (\d*),(\d*) through (\d*),(\d*)/
    );
    return {
      command: match[1],
      x1: parseInt(match[2]),
      y1: parseInt(match[3]),
      x2: parseInt(match[4]),
      y2: parseInt(match[5]),
    };
  });
};

const calculateSolution = (parsedInput) => {
  let grid = [];
  for (let x = 0; x < 1000; x++) {
    let row = [];
    for (let y = 0; y < 1000; y++) {
      row.push(false);
    }
    grid.push(row);
  }
  for (let inst of parsedInput) {
    for (let x = inst.x1; x <= inst.x2; x++) {
      for (let y = inst.y1; y <= inst.y2; y++) {
        switch (inst.command) {
          case "turn on":
            grid[x][y] = true;
            break;
          case "turn off":
            grid[x][y] = false;
            break;
          case "toggle":
            grid[x][y] = !grid[x][y];
            break;
        }
      }
    }
  }

  return grid.reduce(
    (acc, curr) =>
      (acc += curr.reduce((acc2, curr2) => (acc2 += curr2 ? 1 : 0), 0)),
    0
  );
};

export default solution;
