const day20_2 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  const extension = 500;
  const [algorithm, image] = input.split("\r\n\r\n");
  const grid = [];
  let lines = image.split("\r\n");
  let width = lines[0].length + extension * 2;
  for (let x = 0; x < extension; x++) {
    let row = [];
    for (let y = 0; y < width; y++) {
      row.push("0");
    }
    grid.push(row);
  }
  for (let row of lines) {
    let gridRow = [];
    for (let x = 0; x < extension; x++) {
      gridRow.push("0");
    }
    gridRow.push(...row.split("").map((val) => (val === "#" ? "1" : "0")));
    for (let x = 0; x < extension; x++) {
      gridRow.push("0");
    }
    grid.push(gridRow);
  }

  for (let x = 0; x < extension; x++) {
    let row = [];
    for (let y = 0; y < width; y++) {
      row.push("0");
    }
    grid.push(row);
  }
  return { algorithm, grid };
};

const calculateSolution = (parsedInput) => {
  let { algorithm, grid } = parsedInput;

  let newGrid = grid;
  for (let x = 1; x <= 50; x++) {
    newGrid = applyAlgorithm(newGrid, algorithm, x);
  }

  let count = newGrid.reduce(
    (acc, curr) =>
      acc + curr.reduce((acc2, curr2) => acc2 + parseInt(curr2), 0),
    0
  );
  return count;
};

const fillGrid = (rows, cols) => {
  let grid = [];
  for (let x = 0; x < rows; x++) {
    let row = [];
    for (let y = 0; y < cols; y++) {
      row.push("0");
    }
    grid.push(row);
  }
  return grid;
};

export default day20_2;
function applyAlgorithm(grid, algorithm, iteration) {
  let newGrid = fillGrid(grid.length, grid[0].length);

  for (let x = iteration; x < grid.length - iteration; x++) {
    for (let y = iteration; y < grid[x].length - iteration; y++) {
      let number =
        grid[x - 1][y - 1] +
        grid[x - 1][y] +
        grid[x - 1][y + 1] +
        grid[x][y - 1] +
        grid[x][y] +
        grid[x][y + 1] +
        grid[x + 1][y - 1] +
        grid[x + 1][y] +
        grid[x + 1][y + 1];

      newGrid[x][y] = algorithm[parseInt(number, 2)] === "#" ? "1" : "0";
    }
  }
  return newGrid;
}
