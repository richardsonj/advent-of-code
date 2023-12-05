const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

const calculateSolution = (input) => {
  let total = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      const value = input[y][x];
      if (!Number.isNaN(+value)) {
        const start = x;
        const digits = [];
        while (!Number.isNaN(+input[y][x])) {
          digits.push(input[y][x]);
          x++;
        }
        let symbolFound = false;
        for (let y2 = y - 1; y2 <= y + 1; y2++) {
          if (y2 < 0) continue;
          if (y2 >= input.length || symbolFound) break;
          for (let x2 = start - 1; x2 <= x; x2++) {
            if (x2 < 0) continue;
            if (x2 >= input[y].length) break;
            if (input[y2][x2] !== "." && Number.isNaN(+input[y2][x2])) {
              symbolFound = true;
              total += +digits.join("");
              break;
            }
          }
        }
      }
    }
  }
  return total;
};

export default solution;
