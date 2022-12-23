const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) => input.split("\n\n").map((section) => section.split("\n"));

const calculateSolution = (input) => {
  const [grid, steps] = input;
  const stacks = parseStacks(grid);
  const instructions = steps.map((row) => {
    const splitRow = row.split(" ").map((val) => parseInt(val) - 1);
    return { count: splitRow[1], from: splitRow[3], to: splitRow[5] };
  });
  for (const inst of instructions) {
    for (let i = 0; i <= inst.count; i++) {
      stacks[inst.to].push(stacks[inst.from].splice(-1, 1)[0]);
    }
  }

  return stacks.map((row) => row[row.length - 1]).join("");
};

export default solution;

function parseStacks(grid) {
  const stacks = [];
  const numStacks = (grid[0].length + 1) / 4;

  for (let i = 0; i < numStacks; i++) {
    stacks.push([]);
  }
  for (let i = grid.length - 2; i >= 0; i--) {
    for (let j = 1; j < numStacks * 4; j += 4) {
      if (grid[i][j] !== " ") {
        stacks[Math.floor(j / 4)].push(grid[i][j]);
      }
    }
  }
  return stacks;
}
