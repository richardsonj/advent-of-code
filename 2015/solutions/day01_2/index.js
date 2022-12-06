const day01_2 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("");
};

const calculateSolution = (parsedInput) => {
  let counter = 1;
  let stack = [];
  for (let char of parsedInput) {
    if (char === "(") { stack.push(char);} else {
      if (stack.length ===0) return counter;
      stack.pop();
    }  
    counter++;
  }
};

export default day01_2;
