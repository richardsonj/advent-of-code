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
    paths.push({ from: start, coord: [start[0], start[1] - 1] });
  }
  if (["-", "7", "J"].includes(rightNeighbor)) {
    paths.push({ from: start, coord: [start[0], start[1] + 1] });
  }
  if (["|", "F", "7"].includes(topNeighbor)) {
    paths.push({ from: start, coord: [start[0] - 1, start[1]] });
  }
  if (["|", "L", "J"].includes(bottomNeighbor)) {
    paths.push({ from: start, coord: [start[0] + 1, start[1]] });
  }

  const next = { ...paths[0] };
  const pathCoords = new Set();
  pathCoords.add(`${start[0]},${start[1]}`);
  pathCoords.add(`${next.coord[0]},${next.coord[1]}`);
  while (input[next.coord[0]][next.coord[1]] !== "S") {
    const { from, coord } = next;
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
    let nextCoords;
    for (const potential of potentials) {
      if (potential[0] !== from[0] || potential[1] !== from[1]) {
        nextCoords = potential;
        break;
      }
    }

    pathCoords.add(`${nextCoords[0]},${nextCoords[1]}`);

    next.coord = nextCoords;
    next.from = coord;
  }

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (!pathCoords.has(`${y},${x}`)) {
        input[y][x] = ".";
      }
    }
  }

  next.coord = paths[0].coord;
  next.from = paths[0].from;
  while (input[next.coord[0]][next.coord[1]] !== "S") {
    const { from, coord } = next;
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
    let nextCoords;
    for (const potential of potentials) {
      if (potential[0] !== from[0] || potential[1] !== from[1]) {
        nextCoords = potential;
        break;
      }
    }

    const direction = [nextCoords[0] - coord[0], nextCoords[1] - coord[1]];
    const left = [coord[0] - direction[1], coord[1] + direction[0]];
    const right = [coord[0] + direction[1], coord[1] - direction[0]];

    if (input[right[0]]?.[right[1]] === ".") {
      flood(input, "R", right);
    }
    if (input[left[0]]?.[left[1]] === ".") {
      flood(input, "D", left);
    }

    if (input[right[0] + direction[0]]?.[right[1] + direction[1]] === ".") {
      flood(input, "R", [right[0] + direction[0], right[1] + direction[1]]);
    }
    if (input[left[0] + direction[0]]?.[left[1] + direction[1]] === ".") {
      flood(input, "D", [left[0] + direction[0], left[1] + direction[1]]);
    }

    next.coord = nextCoords;
    next.from = coord;
  }
  let insideSymbol;
  for (let x = 0; x < input[0].length; x++) {
    if (input[0][x] === "R") {
      insideSymbol = "D";
      break;
    } else if (input[0][x] === "D") {
      insideSymbol = "R";
      break;
    }
  }

  return input.reduce((acc, curr) => acc + curr.filter((val) => val === insideSymbol).length, 0);
};

const flood = (input, symbol, coord) => {
  input[coord[0]][coord[1]] = symbol;
  for (const direction of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]) {
    const next = [coord[0] + direction[0], coord[1] + direction[1]];
    if (input[next[0]]?.[next[1]] === ".") {
      flood(input, symbol, next);
    }
  }
};

export default solution;
