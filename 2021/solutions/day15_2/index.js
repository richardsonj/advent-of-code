const day15_2 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  let initialGrid = input.split("\r\n").map((row) =>
    row.split("").map((val) => ({
      risk: parseInt(val),
      visited: false,
      minPathRisk: Infinity,
      neighbors: [],
    }))
  );

  let expandedGrid = [];

  for (let x = 0; x < 5; x++) {
    for (let row of initialGrid) {
      let newRow = [];
      for (let y = 0; y < 5; y++) {
        newRow.push(
          ...row.map((obj) => {
            let newObj = { ...obj };
            newObj.risk += y;
            if (newObj.risk > 9) newObj.risk %= 9;
            newObj.neighbors = [];
            return newObj;
          })
        );
      }
      expandedGrid.push(
        newRow.map((obj) => {
          let newObj = { ...obj };
          newObj.risk += x;
          if (newObj.risk > 9) newObj.risk %= 9;
          newObj.neighbors = [];
          return newObj;
        })
      );
    }
  }
  return expandedGrid;
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
    let candidates = visited.filter(a=>a.minPathRisk !== Infinity)
    candidates.sort((a, b) => a.minPathRisk - b.minPathRisk);
    let startNode = candidates[0];
    findShortestPath(startNode);
    if (startNode === nodes[nodes.length - 1][nodes[0].length - 1]) break;
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

export default day15_2;
