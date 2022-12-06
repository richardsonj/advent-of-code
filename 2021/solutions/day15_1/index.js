const day15_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((row) =>
    row.split("").map((val) => ({
      risk: parseInt(val),
      visited: false,
      minPathRisk: Infinity,
      neighbors: [],
    }))
  );
};

const calculateSolution = (nodes) => {
  let visited = [];
  for (let x = 0; x < nodes.length; x++) {
    for (let y = 0; y < nodes[x].length; y++) {
      visited.push(nodes[x][y]);
      if (nodes[x - 1]?.[y]) {
        nodes[x][y].neighbors.push(nodes[x - 1][y]);
      }
      if (nodes[x + 1]?.[y]) {
        nodes[x][y].neighbors.push(nodes[x + 1][y]);
      }
      if (nodes[x]?.[y + 1]) {
        nodes[x][y].neighbors.push(nodes[x][y + 1]);
      }
      if (nodes[x]?.[y - 1]) {
        nodes[x][y].neighbors.push(nodes[x][y - 1]);
      }
    }
  }
  nodes[0][0].minPathRisk = 0;

  while (visited.length > 0) {
    visited.sort((a, b) => a.minPathRisk - b.minPathRisk);
    let startNode = visited[0];
    findShortestPath(startNode);
    visited.splice(visited.indexOf(startNode), 1);
  }
  return nodes[nodes.length - 1][nodes[0].length - 1].minPathRisk;
};

const findShortestPath = (node) => {
  for (let neighbor of node.neighbors) {
    if (
      !neighbor.visited &&
      node.minPathRisk + neighbor.risk < neighbor.minPathRisk
    ) {
      neighbor.minPathRisk = node.minPathRisk + neighbor.risk;
    }
  }
  node.visited = true;
};

export default day15_1;
