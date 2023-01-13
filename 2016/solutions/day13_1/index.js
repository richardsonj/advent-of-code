const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return parseInt(input);
};

const calculateSolution = (input) => {
  const target = [31, 39];
  const neighborOffsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const visited = new Set();
  const unvisited = { "1,1": { pos: [1, 1], dist: 0, md: manhattanDistance(target, [1, 1]) } };
  while (true) {
    const node = Object.values(unvisited).sort((left, right) => left.md - right.md)[0];
    const nodeKey = `${node.pos[0]},${node.pos[1]}`;
    delete unvisited[nodeKey];
    const neighbors = neighborOffsets
      .map((offset) => [node.pos[0] + offset[0], node.pos[1] + offset[1]])
      .filter(
        (item) =>
          item[0] >= 0 &&
          item[1] >= 0 &&
          isOpen(item, input) &&
          !visited.has(`${item[0]},${item[1]}`)
      );
    for (const neighbor of neighbors) {
      const key = `${neighbor[0]},${neighbor[1]}`;
      if (neighbor[0] === target[0] && neighbor[1] === target[1]) {
        return node.dist + 1;
      }
      let dist = node.dist + 1;
      if (unvisited[key]) {
        dist = Math.min(unvisited[key].dist, dist);
        const md = dist + manhattanDistance(target, neighbor);
        unvisited[key] = { pos: neighbor, dist, md };
      }
      const md = dist + manhattanDistance(target, neighbor);
      unvisited[key] = { pos: neighbor, dist, md };
    }
    visited.add(nodeKey);
  }
};

const isOpen = (point, input) => {
  const x = point[0];
  const y = point[1];
  const num = x * x + 3 * x + 2 * x * y + y + y * y + input;
  const oneCount = num
    .toString(2)
    .split("")
    .filter((digit) => digit === "1").length;
  return oneCount % 2 === 0;
};

const manhattanDistance = (left, right) => {
  return Math.abs(left[0] - right[0]) + Math.abs(left[1] - right[1]);
};

export default solution;
