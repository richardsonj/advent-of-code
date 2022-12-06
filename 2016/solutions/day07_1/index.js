const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n");
};

const calculateSolution = (input) => {
  let count = 0;
  for (let ip of input) {
    let inBraces = false;
    let isTLS = false;
    for (let x = 0; x < ip.length; x++) {
      if (ip[x] === "[") {
        inBraces = true;
        continue;
      }
      if (ip[x] === "]") {
        inBraces = false;
        continue;
      }
      if (
        ip[x + 1] &&
        ip[x + 2] &&
        ip[x + 3] &&
        ip[x] !== ip[x + 1] &&
        ip[x] === ip[x + 3] &&
        ip[x + 1] === ip[x + 2]
      ) {
        if (inBraces) {
          isTLS = false;
          break;
        }
        isTLS = true;
      }
    }
    if (isTLS) count++;
  }
  return count;
};

export default solution;
