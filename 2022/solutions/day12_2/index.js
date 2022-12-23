const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input.split("\n").map((row) => row.split("").map((val) => val.charCodeAt(0)));

const calculateSolution = (input) => {
  const numV = input.flat().length;
  const width = input.length;
  const height = input[0].length;
  let start;
  const adjacency = [];
  const distance = [];
  for (let x = 0; x < numV; x++) {
    adjacency.push(new Array(numV).fill(0));
    distance.push(Infinity);
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (input[x][y] === 69) {
        start = nodeName(x, y, height);
        input[x][y] = "z".charCodeAt(0);
      }

      if (input[x][y] === 83) {
        input[x][y] = "a".charCodeAt(0);
      }
    }
  }
  distance[start] = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const name = nodeName(x, y, height);
      const neighbors = generateNeighbors(x, y, width, height);
      for (const neighbor of neighbors) {
        if (input[x][y] - input[neighbor[0]][neighbor[1]] <= 1) {
          adjacency[name][nodeName(neighbor[0], neighbor[1], height)] = 1;
        }
      }
    }
  }

  const spt = new Set();

  while (spt.size < distance.length) {
    const src = findMin(distance, spt);
    if (src === Infinity) {
      break;
    }
    look(src, adjacency, distance, spt);
  }

  // visualizeDistance(distance, width, height);
  const aNodes = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (input[x][y] === 97) {
        aNodes.push(distance[nodeName(x, y, height)]);
      }
    }
  }
  return Math.min(...aNodes);
};

const findMin = (distance, spt) => {
  let min = Infinity;
  let minIndex = Infinity;
  for (let x = 0; x < distance.length; x++) {
    if (!spt.has(x) && distance[x] < min) {
      minIndex = x;
      min = distance[x];
    }
  }
  return minIndex;
};

const visualizeDistance = (distance, width, height) => {
  for (let x = 0; x < width; x++) {
    const row = [];
    for (let y = 0; y < height; y++) {
      row.push(distance[nodeName(x, y, height)].toString().padStart(3, " "));
    }
    console.log(row.join(" "));
  }
};

const look = (src, adjacency, distance, spt) => {
  spt.add(src);
  for (let dest = 0; dest < adjacency.length; dest++) {
    if (adjacency[src][dest] === 1) {
      if (distance[dest] > distance[src] + 1) {
        distance[dest] = distance[src] + 1;
      }
    }
  }
};

const nodeName = (x, y, height) => x * height + y;

const generateNeighbors = (x, y, width, height) => {
  const neighbors = [];
  if (x !== 0) {
    neighbors.push([x - 1, y]);
  }
  if (x !== width - 1) {
    neighbors.push([x + 1, y]);
  }
  if (y !== 0) {
    neighbors.push([x, y - 1]);
  }
  if (y !== height - 1) {
    neighbors.push([x, y + 1]);
  }
  return neighbors;
};

export default solution;
