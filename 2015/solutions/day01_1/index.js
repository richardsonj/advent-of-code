const day01_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("");
};

const calculateSolution = (parsedInput) => {
  return parsedInput.filter((val)=> val ==="(").length - parsedInput.filter((val)=> val ===")").length ;
};

export default day01_1;
