const day03_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input;
};

const calculateSolution = (parsedInput) => {
  let visited = new Set();
  let current = {x:0, y:0};
  visited.add(`${current.x}:${current.y}`);
  for (let char of parsedInput) {
    if (char === "^"){
      current.y++;
    } else if (char==="v") {
      current.y--;
    } else if (char === ">") {
      current.x++;
    } else if (char === "<") {
      current.x--;
    }
    visited.add(`${current.x}:${current.y}`);
  }

  return visited.size;
};

export default day03_1;
