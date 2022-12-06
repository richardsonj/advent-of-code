const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input;
};

const calculateSolution = (parsedInput) => {
  let input = parsedInput;
  for (let x = 0; x < 40; x++) {
    input = seesay(input);
  }
  return input.length;
};

const seesay = (input) => {
  let digit;
  let count = 0;
  let output = "";
  for (let char of input) {
    if (char === digit) {
      count++;
    } else if (!digit) {
      digit = char;
      count = 1;
    } else {
      output += count;
      output += digit;
      digit = char;
      count = 1;
    }
  }
  return output + count + digit;
};

export default solution;
