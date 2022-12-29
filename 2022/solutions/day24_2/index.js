const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input.split("\n").map((row) =>
    row.split("").map((item) => ({
      blizzards: item !== "." ? [item] : [],
      distance: Infinity,
    }))
  );

const calculateSolution = (input) => {
  const limitedGrid = input.map((row) => row.slice(1, -1)).slice(1, -1);
  const lcm = findLCM(limitedGrid.length, limitedGrid[0].length);
  const grids = [limitedGrid];

  for (let x = 0; x < lcm - 1; x++) {
    grids.push(advanceGrid(grids[x]));
  }

  findNeighbors(grids);
  const start = {
    neighbors: [],
    distance: 0,
    distanceToExit: limitedGrid.length + limitedGrid[0].length + 2,
    distanceToStart: 0,
  };
  for (let gridIndex = 0; gridIndex < grids.length; gridIndex++) {
    if (grids[gridIndex][0][0].blizzards.length === 0) {
      start.neighbors.push({ distance: gridIndex || grids.length, node: grids[gridIndex][0][0] });
    }
    grids[gridIndex][0][0].neighbors.push({
      distance: 1,
      node: start,
    });
  }
  const end = {
    neighbors: [],
    distance: Infinity,
    distanceToExit: 0,
    distanceToStart: limitedGrid.length + limitedGrid[0].length + 2,
  };
  for (let gridIndex = 0; gridIndex < grids.length; gridIndex++) {
    grids[gridIndex][grids[gridIndex].length - 1][grids[gridIndex][0].length - 1].neighbors.push({
      distance: 1,
      node: end,
    });
    if (
      grids[gridIndex][grids[gridIndex].length - 1][grids[gridIndex][0].length - 1].blizzards
        .length === 0
    ) {
      end.neighbors.push({ distance: gridIndex || grids.length, node: grids[gridIndex][0][0] });
    }
  }

  let visited = new Set();
  let unvisited = new Set([start]);
  let shortestPath = findShortestPath(end, end, visited, unvisited);
  reset(grids, shortestPath, start, end, lcm);
  end.distance = 0;
  unvisited = new Set([end]);
  visited = new Set();
  shortestPath += findShortestPath(end, start, visited, unvisited);
  reset(grids, shortestPath, start, end, lcm);
  start.distance = 0;
  unvisited = new Set([start]);
  visited = new Set();
  return shortestPath + findShortestPath(end, end, visited, unvisited);
};

const reset = (grids, shortestPath, start, end, cycleLength) => {
  start.distance = Infinity;
  end.distance = Infinity;
  end.neighbors = [];
  start.neighbors = [];
  for (let gridIndex = 0; gridIndex < grids.length; gridIndex++) {
    for (let y = 0; y < grids[gridIndex].length; y++) {
      for (let x = 0; x < grids[gridIndex][y].length; x++) {
        grids[gridIndex][y][x].distance = Infinity;
      }
    }
    if (
      grids[gridIndex][grids[gridIndex].length - 1][grids[gridIndex][0].length - 1].blizzards
        .length === 0
    ) {
      end.neighbors.push({
        distance:
          (gridIndex + cycleLength - (shortestPath % cycleLength)) % cycleLength || grids.length,
        node: grids[gridIndex][grids[gridIndex].length - 1][grids[gridIndex][0].length - 1],
      });
    }
    if (grids[gridIndex][0][0].blizzards.length === 0) {
      start.neighbors.push({
        distance:
          (gridIndex + cycleLength - (shortestPath % cycleLength)) % cycleLength || grids.length,
        node: grids[gridIndex][0][0],
      });
    }
  }
};

const findShortestPath = (end, goal, visited, unvisited) => {
  while (!visited.has(goal)) {
    let target;

    for (const node of unvisited) {
      if (
        !target ||
        (!visited.has(node) &&
          node.distance + (goal === end ? node.distanceToExit : node.distanceToStart) <
            target.distance + (goal === end ? target.distanceToExit : target.distanceToStart))
      ) {
        target = node;
      }
    }

    if (target === goal) {
      return goal.distance;
    }
    for (const neighbor of target.neighbors) {
      if (target.distance + neighbor.distance < neighbor.node.distance) {
        neighbor.node.distance = target.distance + neighbor.distance;
      }
      unvisited.add(neighbor.node);
    }
    visited.add(target);
    unvisited.delete(target);
  }
};

const findNeighbors = (grids) => {
  for (let gridIndex = 0; gridIndex < grids.length; gridIndex++) {
    for (let y = 0; y < grids[gridIndex].length; y++) {
      for (let x = 0; x < grids[gridIndex][y].length; x++) {
        grids[gridIndex][y][x].gridIndex = gridIndex;
        grids[gridIndex][y][x].coordinates = [y, x];
        grids[gridIndex][y][x].distanceToExit =
          Math.abs(grids[gridIndex].length - y) + Math.abs(grids[gridIndex][0].length - x) + 1;
        grids[gridIndex][y][x].distanceToStart = y + x + 1;
        const nextGrid = grids[(gridIndex + 1) % grids.length];
        const neighborsCoords = findOpenSpots([y, x], nextGrid);
        grids[gridIndex][y][x].neighbors = neighborsCoords.map((neighbor) => ({
          distance: 1,
          node: nextGrid[y + neighbor[0]][x + neighbor[1]],
        }));
      }
    }
  }
};

const findLCM = (num1, num2) => {
  for (let x = num1; x < Infinity; x += num1) {
    if (x % num2 === 0) {
      return x;
    }
  }
};

const findOpenSpots = (pos, nextGrid) => {
  const candidates = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [0, 0],
  ];
  return candidates.filter((candidate) => {
    const space = nextGrid[pos[0] + candidate[0]]?.[pos[1] + candidate[1]];
    return !!space && space.blizzards.length === 0;
  });
};

const advanceGrid = (grid) => {
  const newGrid = [];
  for (let x = 0; x < grid.length; x++) {
    newGrid.push([]);
    for (let y = 0; y < grid[0].length; y++) {
      newGrid[x].push({ blizzards: [], distance: Infinity });
    }
  }
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x].blizzards.includes("<")) {
        newGrid[y][(x - 1 + grid[0].length) % grid[0].length].blizzards.push("<");
      }
      if (grid[y][x].blizzards.includes(">")) {
        newGrid[y][(x + 1) % grid[0].length].blizzards.push(">");
      }
      if (grid[y][x].blizzards.includes("^")) {
        newGrid[(y - 1 + grid.length) % grid.length][x].blizzards.push("^");
      }
      if (grid[y][x].blizzards.includes("v")) {
        newGrid[(y + 1) % grid.length][x].blizzards.push("v");
      }
    }
  }
  return newGrid;
};
function displayGrid(grid) {
  console.log(
    grid
      .map((row) =>
        row
          .map((cell) => {
            if (cell.blizzards.length === 0) {
              return ".";
            }
            if (cell.blizzards.length === 1) {
              return cell.blizzards[0];
            }
            return cell.blizzards.length;
          })
          .join("")
      )
      .join("\n")
  );
}

export default solution;
