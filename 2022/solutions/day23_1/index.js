const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) => input.split("\n").map((row) => row.split(""));

const calculateSolution = (input) => {
  const elfCount = input.reduce((acc, curr) => acc + curr.filter((val) => val === "#").length, 0);
  const largeGrid = [];
  for (let x = 0; x < elfCount * 2; x++) {
    largeGrid.push(new Array(elfCount * 2).fill("."));
  }

  const inputOffset = [
    Math.floor((largeGrid[0].length - input[0].length) / 2),
    Math.floor((largeGrid.length - input.length) / 2),
  ];

  const elves = [];

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === "#") {
        const elf = { proposalPosition: undefined, toString: () => "#" };
        largeGrid[inputOffset[0] + y][inputOffset[1] + x] = elf;
        elves.push(elf);
      }
    }
  }

  const decisions = [
    {
      dest: [-1, 0],
      checks: [
        [-1, -1],
        [-1, 0],
        [-1, 1],
      ],
    },
    {
      dest: [1, 0],
      checks: [
        [1, -1],
        [1, 0],
        [1, 1],
      ],
    },
    {
      dest: [0, -1],
      checks: [
        [-1, -1],
        [0, -1],
        [1, -1],
      ],
    },
    {
      dest: [0, 1],
      checks: [
        [-1, 1],
        [0, 1],
        [1, 1],
      ],
    },
  ];

  // let finished = false;
  for (let x = 0; x < 10; x++) {
    executeRound(largeGrid, decisions, elves);
    decisions.push(decisions.splice(0, 1)[0]);
  }

  return calculateRectangle(largeGrid) - elves.length;
};

const calculateRectangle = (grid) => {
  let minX = Infinity;
  let maxX = 0;
  let minY = Infinity;
  let maxY = 0;

  for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] !== ".") {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }
  return (maxX - minX + 1) * (maxY - minY + 1);
};

const findProposalPosition = (x, y, decisions, grid) => {
  const N = grid[y - 1][x];
  const NE = grid[y - 1][x + 1];
  const E = grid[y][x + 1];
  const SE = grid[y + 1][x + 1];
  const S = grid[y + 1][x];
  const SW = grid[y + 1][x - 1];
  const W = grid[y][x - 1];
  const NW = grid[y - 1][x - 1];

  if (
    N === "." &&
    NE === "." &&
    E === "." &&
    SE === "." &&
    S === "." &&
    SW === "." &&
    W === "." &&
    NW === "."
  ) {
    return [y, x];
  }

  for (const decision of decisions) {
    let empty = true;
    for (const check of decision.checks) {
      if (grid[y + check[0]][x + check[1]] !== ".") {
        empty = false;
        break;
      }
    }
    if (empty) {
      return [y + decision.dest[0], x + decision.dest[1]];
    }
  }
  return [y, x];
};

function executeRound(largeGrid, decisions, elves) {
  for (let x = 0; x < largeGrid[0].length; x++) {
    for (let y = 0; y < largeGrid.length; y++) {
      if (largeGrid[y][x] !== ".") {
        largeGrid[y][x].proposalPosition = findProposalPosition(x, y, decisions, largeGrid);
      }
    }
  }

  for (let elfIndex1 = 0; elfIndex1 < elves.length - 1; elfIndex1++) {
    for (let elfIndex2 = elfIndex1 + 1; elfIndex2 < elves.length; elfIndex2++) {
      if (elfIndex1 === elfIndex2) continue;
      const elf1 = elves[elfIndex1];
      const elf2 = elves[elfIndex2];
      if (
        elf1.proposalPosition?.[0] === elf2.proposalPosition?.[0] &&
        elf1.proposalPosition?.[1] === elf2.proposalPosition?.[1]
      ) {
        elf1.proposalPosition = undefined;
        elf2.proposalPosition = undefined;
      }
    }
  }
  let finished = true;
  for (let x = 0; x < largeGrid[0].length; x++) {
    for (let y = 0; y < largeGrid.length; y++) {
      const elf = largeGrid[y][x];
      if (elf !== "." && elf.proposalPosition) {
        if (elf.proposalPosition?.[0] !== y || elf.proposalPosition?.[1] !== x) {
          finished = false;
        }
        largeGrid[y][x] = ".";
        largeGrid[elf.proposalPosition[0]][elf.proposalPosition[1]] = elf;
      }
    }
  }
  return finished;
}

export default solution;
