const day03_2 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input;
};

const calculateSolution = (parsedInput) => {
  let visited = new Set();
  let currents = [{x:0, y:0},{x:0, y:0}];
  visited.add(`0:0`);
  let iteration = 0;
  for (let char of parsedInput) {
    let current = currents[iteration%2];
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
    iteration++;
  }

  return visited.size;
};

export default day03_2;
