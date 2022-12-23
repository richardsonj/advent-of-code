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
        const elf = {
          proposalPosition: undefined,
          position: [inputOffset[0] + y, inputOffset[1] + x],
        };
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

  let round = 1;
  while (true) {
    const finished = executeRound(largeGrid, decisions, elves);
    if (finished) {
      break;
    }
    decisions.push(decisions.splice(0, 1)[0]);
    round++;
  }

  return round;
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
  for (const elf of elves) {
    elf.proposalPosition = findProposalPosition(
      elf.position[1],
      elf.position[0],
      decisions,
      largeGrid
    );
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
  for (const elf of elves) {
    if (elf !== "." && elf.proposalPosition) {
      const x = elf.position[1];
      const y = elf.position[0];
      if (elf.proposalPosition?.[0] !== y || elf.proposalPosition?.[1] !== x) {
        finished = false;
      }
      largeGrid[y][x] = ".";
      largeGrid[elf.proposalPosition[0]][elf.proposalPosition[1]] = elf;
      elf.position = elf.proposalPosition;
    }
  }
  return finished;
}

export default solution;
