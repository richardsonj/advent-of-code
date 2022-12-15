import fs from "fs";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n")
    .map(row => row.split(" -> ")
      .map(coords => coords.split(",")
        .map(coord => parseInt(coord))));
};

const calculateSolution = (input) => {
  const xCoords = input.flat().map(coord => coord[0]);
  const yCoords = input.flat().map(coord => coord[1]);
  const yRange = [Math.min(...yCoords, 0), Math.max(...yCoords, 0)];
  const height = yRange[1] - yRange[0] + 3
  const xRange = [500-height, 500+height];
  const width = 2 * height + 1
  const grid = [];
  for (let x = 0; x < width; x++) {
    const col = new Array(height-1).fill(".");
    col.push("#");
    grid.push(col);
  }

  for (const row of input) {
    let start = row[0];
    for (let line = 1; line < row.length; line++) {
      const next = row[line];
      if (next[0] === start[0]) {
        const begin = start[1] < next[1] ? start[1] : next[1];
        const end = start[1] < next[1] ? next[1] : start[1];
        for (let y = begin; y <= end; y++) {
          grid[start[0] - xRange[0]][y - yRange[0]] = "#";
        }
      }
      else {
        const begin = start[0] < next[0] ? start[0] : next[0];
        const end = start[0] < next[0] ? next[0] : start[0];
        for (let x = begin; x <= end; x++) {
          grid[x - xRange[0]][start[1] - yRange[0]] = "#";
        }
      }
      start = next;
    }
  }
  let count = 0
  while (simulateSand(grid, [500-xRange[0], 0])) {
    count++;
  }
  const transposed = [];
  for (let y = 0; y < grid[0].length; y++) {
    transposed.push(new Array(grid.length));
  }
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      transposed[y][x] = grid[x][y];
    }
  }
  fs.writeFileSync("sandpile.txt", transposed.map(row=>row.join("")).join("\n"));
  return count + 1;
};

const simulateSand = (grid, origin) => {
  let current = [...origin];
  while (true) {
    let candidateCoords = [current[0], current[1]+1]
    let check = checkCandidateCoords(grid, candidateCoords);
    if (check === undefined)
    {
      return false;
    }
    if (check) {
      current = candidateCoords;
      continue;
    }
    candidateCoords = [current[0]-1, current[1]+1]
    check = checkCandidateCoords(grid, candidateCoords);
    if (check === undefined)
    {
      return false;
    }
    if (check) {
      current = candidateCoords;
      continue;
    }
    candidateCoords = [current[0]+1, current[1]+1]
    check = checkCandidateCoords(grid, candidateCoords);
    if (check === undefined)
    {
      return false;
    }
    if (check) {
      current = candidateCoords;
      continue;
    }
    if (current[0] === origin[0] && current[1] === origin[1]) {
      return false;
    }
    grid[current[0]][current[1]] = "O"
    break;
  }
  
  return true;
}

const checkCandidateCoords = (grid, coords) => {
  let candidateSpot = grid[coords[0]]?.[coords[1]];
    if (candidateSpot === undefined) {
      return undefined;
    }
    if (candidateSpot === ".") {
      return true;
    }
    return false;
}

export default solution;
