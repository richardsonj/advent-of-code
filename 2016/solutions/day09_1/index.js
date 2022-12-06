const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input;
};

const calculateSolution = (input) => {
  return decompress(input);
};

const decompress = (input) => {
  let length = input.length;
  for (let x = 0; x < input.length; x++) {
    if (input[x] === "(") {
      let marker = "(";
      x += 1;
      for (; input[x - 1] !== ")"; x++) {
        marker += input[x];
      }

      let match = marker.match(/\((\d*)x(\d*)\)/);
      if (!match) {
        continue;
      }
      length -= marker.length;
      const [, segLength, repeats] = match;
      length += parseInt(segLength) * (parseInt(repeats) - 1);
      x += parseInt(segLength) - 1;
    }
  }
  return length;
};

export default solution;
