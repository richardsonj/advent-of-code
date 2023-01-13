const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").splice(2);
};

const calculateSolution = (input) => {
  const grid = [];
  for (let y = 0; y < 32; y++) {
    grid.push(new Array(30).fill("."));
  }
  input.forEach((row) => {
    const match = row.match(
      /\/dev\/grid\/node-x([0-9]+)-y([0-9]+)(?:\s+)(?:[0-9]+)T(?:\s+)([0-9]+)T(?:\s+)([0-9]+)T(?:\s+)(?:[0-9]+)%/
    );

    const x = parseInt(match[1]);
    const y = parseInt(match[2]);
    const used = parseInt(match[3]);
    if (used === 0) {
      grid[y][x] = "_";
    } else if (used > 100) {
      grid[y][x] = "#";
    }
  });

  return grid.map((row) => row.join("")).join("\n");
};

export default solution;
