const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

const calculateSolution = (input) => {
  let start;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === "S") {
        start = [y, x];
      }
    }
  }
  if (!start) return "broke";

  const leftNeighbor = input[start[0]][start[1] - 1];
  const rightNeighbor = input[start[0]][start[1] + 1];
  const topNeighbor = input[start[0] - 1]?.[start[1]];
  const bottomNeighbor = input[start[0] + 1]?.[start[1]];

  const paths = [];
  if (["-", "F", "L"].includes(leftNeighbor)) {
    paths.push({ dist: 1, from: start, coord: [start[0], start[1] - 1] });
  }
  if (["-", "7", "J"].includes(rightNeighbor)) {
    paths.push({ dist: 1, from: start, coord: [start[0], start[1] + 1] });
  }
  if (["|", "F", "7"].includes(topNeighbor)) {
    paths.push({ dist: 1, from: start, coord: [start[0] - 1, start[1]] });
  }
  if (["|", "L", "J"].includes(bottomNeighbor)) {
    paths.push({ dist: 1, from: start, coord: [start[0] + 1, start[1]] });
  }

  const visited = new Set();
  visited.add(`${start[0]},${start[1]}`);
  // eslint-disable-next-line no-constant-condition
  let run = true;
  while (run) {
    for (let x = 0; x < paths.length; x++) {
      const { dist, from, coord } = paths[x];
      const potentials = [];
      switch (input[coord[0]][coord[1]]) {
        case "-":
          potentials.push([coord[0], coord[1] - 1]);
          potentials.push([coord[0], coord[1] + 1]);
          break;
        case "|":
          potentials.push([coord[0] - 1, coord[1]]);
          potentials.push([coord[0] + 1, coord[1]]);
          break;
        case "L":
          potentials.push([coord[0] - 1, coord[1]]);
          potentials.push([coord[0], coord[1] + 1]);
          break;
        case "J":
          potentials.push([coord[0] - 1, coord[1]]);
          potentials.push([coord[0], coord[1] - 1]);
          break;
        case "F":
          potentials.push([coord[0] + 1, coord[1]]);
          potentials.push([coord[0], coord[1] + 1]);
          break;
        case "7":
          potentials.push([coord[0] + 1, coord[1]]);
          potentials.push([coord[0], coord[1] - 1]);
          break;
      }
      let next;
      for (const potential of potentials) {
        if (potential[0] !== from[0] || potential[1] !== from[1]) {
          next = potential;
          break;
        }
      }
      if (visited.has(`${next[0]},${next[1]}`)) {
        run = false;
        break;
      }
      visited.add(`${next[0]},${next[1]}`);
      paths[x].coord = next;
      paths[x].dist = dist + 1;
      paths[x].from = coord;
    }
  }
  return Math.max(...paths.map((path) => path.dist));
};

// const makeGraph = (input) => {
//   let startingNode;
//   const nodes = {};
//   for (let y = 0; y < input.length; y++) {
//     for (let x = 0; x < input[0].length; x++) {
//       switch (input[y][x]) {
//         case "S":
//           const leftNeighbor = input[y][x - 1];
//           const rightNeighbor = input[y][x + 1];
//           const topNeight = input[y-1]?.[x];
//           const bottomNeighbor = input[y-1]?.[x];
//           const node = {};

//           break;
//       }
//     }
//   }
// };

export default solution;
