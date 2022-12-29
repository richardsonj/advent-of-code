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
  const start = { neighbors: [], distance: 0 };
  for (let gridIndex = 0; gridIndex < grids.length; gridIndex++) {
    if (grids[gridIndex][0][0].blizzards.length === 0) {
      start.neighbors.push({ distance: gridIndex || grids.length, node: grids[gridIndex][0][0] });
    }
    grids[gridIndex][0][0].neighbors.push({
      distance: 1,
      node: start,
    });
  }
  const end = { neighbors: [], distance: Infinity };
  for (let gridIndex = 0; gridIndex < grids.length; gridIndex++) {
    grids[gridIndex][grids[gridIndex].length - 1][grids[gridIndex][0].length - 1].neighbors.push({
      distance: 1,
      node: end,
    });
  }

  const visited = [];
  const unvisited = new Set([start, end, ...grids.flat(3)]);
  let lastTime = new Date().getTime();
  while (!visited.includes(end)) {
    if (unvisited.size % 2000 === 0) {
      const currentTime = new Date().getTime();
      const deltaTime = currentTime - lastTime;
      const iterationsPerSecond = 1000 / (deltaTime / 1000);
      const secondsRemaining = Math.floor(unvisited.size / iterationsPerSecond);
      console.log(`${Math.floor(secondsRemaining / 60)}m ${secondsRemaining % 60}s`);
      lastTime = currentTime;
    }
    let target;
    // = unvisited.reduce((left, right) =>
    //   left.distance < right.distance ? left : right
    // );

    for (const node of unvisited) {
      if (
        !target ||
        node.distance +
          Math.abs(node.coordinates[0] - grids.length - 1) +
          Math.abs(node.coordinates[1] - grids[0].length - 1) <
          target.distance +
            Math.abs(target.coordinates[0] - grids.length - 1) +
            Math.abs(target.coordinates[1] - grids[0].length - 1)
      ) {
        target = node;
      }
    }

    if (target === end) {
      return end.distance;
    }
    for (const neighbor of target.neighbors) {
      if (target.distance + neighbor.distance < neighbor.node.distance) {
        neighbor.node.distance = target.distance + neighbor.distance;
      }
    }
    visited.push(target);
    unvisited.delete(target);
  }

  // return makeMove({
  //   pos: [-1, 0],
  //   score: 0,
  //   minScore: Infinity,
  //   grid: input.map((row) => row.slice(1, -1)).slice(1, -1),
  // });
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

// const makeMove = (state) => {
//   if (state.score + 1 >= state.minScore) return Infinity;
//   const nextGrid = advanceGrid(state.grid);
//   const availableMoves = findOpenSpots(state, nextGrid);
//   if (!availableMoves) return Infinity;
//   for (const move of availableMoves) {
//     if (
//       state.pos[0] + move[0] === state.grid.length - 1 &&
//       state.pos[1] + move[1] === state.grid[0].length - 1 &&
//       state.score + 2 < state.minScore
//     ) {
//       console.log(state.score + 2);
//       return state.score + 2;
//     }

//     const totalScore = makeMove({
//       pos: [state.pos[0] + move[0], state.pos[1] + move[1]],
//       score: state.score + 1,
//       minScore: state.minScore,
//       grid: nextGrid,
//     });
//     state.minScore = Math.min(totalScore, state.minScore);
//   }
//   return state.minScore;
// };

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
