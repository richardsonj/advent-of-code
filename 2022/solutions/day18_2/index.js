const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input.split("\n").map((row) => row.split(",").map((val) => parseInt(val)));

const calculateSolution = (input) => {
  const { maxX, maxY, maxZ } = input.reduce(
    (acc, curr) => {
      acc.maxX = Math.max(acc.maxX, curr[0]);
      acc.maxY = Math.max(acc.maxY, curr[1]);
      acc.maxZ = Math.max(acc.maxZ, curr[2]);
      return acc;
    },
    { maxX: 0, maxY: 0, maxZ: 0 }
  );
  const grid = [];
  for (let x = 0; x < maxX + 1; x++) {
    grid.push([]);
    for (let y = 0; y < maxY + 1; y++) {
      grid[x].push(new Array(maxZ + 1).fill("."));
    }
  }
  for (const point of input) {
    grid[point[0]][point[1]][point[2]] = "#";
  }

  for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[0].length - 1; y++) {
      for (let z = 1; z < grid[0][0].length - 1; z++) {
        const boundRegion = grid[x][y][z] === "." && getBoundRegion(x, y, z, grid, new Set());
        if (!boundRegion) continue;
        for (const point of boundRegion) {
          grid[point[0]][point[1]][point[2]] = "#";
        }
      }
    }
  }

  let surfaceArea = 0;
  for (const point of input) {
    const neighbors = getNeighbors(grid, ...point);

    for (const neighbor of neighbors) {
      if (neighbor !== "#") {
        surfaceArea += 1;
      }
    }
  }
  return surfaceArea;
};

const getBoundRegion = (x, y, z, grid, visited) => {
  const neighborCoords = getNeighborCoordinates(x, y, z);

  const emptyNeighbors = [];
  for (const neighborCoord of neighborCoords) {
    const neighbor = grid[neighborCoord[0]]?.[neighborCoord[1]]?.[neighborCoord[2]];
    if (neighbor === undefined) {
      return undefined;
    }
    if (visited.has(JSON.stringify(neighborCoord))) {
      continue;
    }
    if (neighbor === ".") {
      visited.add(JSON.stringify(neighborCoord));
      emptyNeighbors.push(neighborCoord);
      const rest = getBoundRegion(
        neighborCoord[0],
        neighborCoord[1],
        neighborCoord[2],
        grid,
        visited
      );
      if (rest) {
        emptyNeighbors.push(...rest);
      } else {
        return undefined;
      }
    }
  }
  return [...emptyNeighbors, [x, y, z]];
};

const getNeighbors = (grid, x, y, z) => {
  const neighbors = [];
  neighbors.push(grid[x][y][z + 1]);
  neighbors.push(grid[x][y][z - 1]);
  neighbors.push(grid[x][y + 1]?.[z]);
  neighbors.push(grid[x][y - 1]?.[z]);
  neighbors.push(grid[x + 1]?.[y][z]);
  neighbors.push(grid[x - 1]?.[y][z]);
  return neighbors;
};

const getNeighborCoordinates = (x, y, z) => {
  const neighbors = [];
  neighbors.push([x, y, z + 1]);
  neighbors.push([x, y, z - 1]);
  neighbors.push([x, y + 1, z]);
  neighbors.push([x, y - 1, z]);
  neighbors.push([x + 1, y, z]);
  neighbors.push([x - 1, y, z]);
  return neighbors;
};

export default solution;
