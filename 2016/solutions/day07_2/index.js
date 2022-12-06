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
    let found = [];
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
        ip[x] !== ip[x + 1] &&
        ip[x] === ip[x + 2]
      ) {
        if (inBraces) {
          let key = `${ip[x]}${ip[x+1]}`;
          let hyperkey = `${ip[x+1]}${ip[x]}0`
          if (found.includes(key)){
            isTLS = true;
            break;
          }
          found.push(hyperkey);
        } else {
          let key = `${ip[x+1]}${ip[x]}`;
          let hyperkey = `${ip[x]}${ip[x+1]}0`
          if (found.includes(hyperkey)) {
            isTLS = true;
            break;
          }
          found.push(key);
        }
      }
    }
    if (isTLS) count++;
  }
  return count;
};

export default solution;
