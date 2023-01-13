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
  let length = 0;
  for (let x = 0; x < input.length; x++) {
    if (input[x] === "(") {
      let marker = "(";
      x += 1;
      for (; input[x - 1] !== ")"; x++) {
        marker += input[x];
      }

      const match = marker.match(/\((\d*)x(\d*)\)/);
      if (!match) {
        continue;
      }
      const [, segLength, repeats] = match;
      length += decompress(input.substring(x, x + parseInt(segLength))) * parseInt(repeats);
      x += parseInt(segLength) - 1;
    } else {
      length += 1;
    }
  }
  return length;
};

export default solution;
