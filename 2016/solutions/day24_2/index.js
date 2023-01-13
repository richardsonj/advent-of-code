import { number, permutationsDependencies } from "mathjs";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

const calculateSolution = (input) => {
  const numberedNodes = {};
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      const value = parseInt(input[x][y]);
      if (!Number.isNaN(value)) {
        numberedNodes[value] = [x, y];
      }
    }
  }
  const numberNodeKeys = Object.keys(numberedNodes);

  const distances = [];
  for (let nodeIndex1 = 0; nodeIndex1 < numberNodeKeys.length - 1; nodeIndex1++) {
    if (!distances[numberNodeKeys[nodeIndex1]]) {
      distances[numberNodeKeys[nodeIndex1]] = [];
    }
    for (let nodeIndex2 = nodeIndex1 + 1; nodeIndex2 < numberNodeKeys.length; nodeIndex2++) {
      if (!distances[numberNodeKeys[nodeIndex2]]) {
        distances[numberNodeKeys[nodeIndex2]] = [];
      }
      const dist = shortestPath(
        input,
        numberedNodes[numberNodeKeys[nodeIndex1]],
        numberedNodes[numberNodeKeys[nodeIndex2]]
      );
      distances[numberNodeKeys[nodeIndex1]][numberNodeKeys[nodeIndex2]] = dist;
      distances[numberNodeKeys[nodeIndex2]][numberNodeKeys[nodeIndex1]] = dist;
    }
  }

  const keysToSearch = [...numberNodeKeys];
  keysToSearch.splice(0, 1);
  return findBestPermutation(keysToSearch, 0, distances, 0);
};

const findBestPermutation = (options, start, distances, accumulatedDistance) => {
  if (options.length === 1) {
    return accumulatedDistance + distances[start][options[0]] + distances[options[0]][0];
  }
  let minDistance = Infinity;
  for (const option of options) {
    const keysToSearch = [...options];
    keysToSearch.splice(keysToSearch.indexOf(option), 1);
    const distance = findBestPermutation(
      keysToSearch,
      option,
      distances,
      accumulatedDistance + distances[start][option]
    );
    minDistance = Math.min(distance, minDistance);
  }
  return minDistance;
};

const neighborVectors = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

const manDist = (left, right) => {
  return Math.abs(left[0] - right[0]) + Math.abs(left[1] - right[1]);
};

const shortestPath = (grid, start, end) => {
  const visited = new Set();
  const unvisited = {
    [`${start[0]},${start[1]}`]: { pos: start, distance: 0, md: manDist(start, end) },
  };

  while (Object.values(unvisited).length) {
    const unvisitedKeys = Object.keys(unvisited);
    unvisitedKeys.sort(
      (left, right) =>
        unvisited[left].distance +
        unvisited[left].md -
        (unvisited[right].distance + unvisited[right].md)
    );

    const nodeKey = unvisitedKeys[0];
    const node = unvisited[nodeKey];
    delete unvisited[nodeKey];
    for (const neighborVector of neighborVectors) {
      const neighborPos = [node.pos[0] + neighborVector[0], node.pos[1] + neighborVector[1]];
      const neighbor = grid[neighborPos[0]]?.[neighborPos[1]];
      const neighborKey = `${neighborPos[0]},${neighborPos[1]}`;
      if (neighbor && neighbor !== "#" && !visited.has(neighborKey)) {
        if (neighborPos[0] === end[0] && neighborPos[1] === end[1]) {
          return node.distance + 1;
        }
        let distance = node.distance + 1;
        if (unvisited[neighborKey]) {
          distance = Math.min(distance, unvisited[neighborKey].distance);
        }
        const md = manDist(neighborPos, end);
        unvisited[neighborKey] = { pos: neighborPos, distance, md };
      }
    }
    visited.add(nodeKey);
  }
  return Infinity;
};

export default solution;
