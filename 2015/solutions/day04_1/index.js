import md5 from 'md5';

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input;
};

const calculateSolution = (input) => {
  let hash ="";
  let number = 0;
  while (!hash.startsWith("00000")){
    number++;
    hash = md5(`${input}${number}`);
    
  }
  return number;
};

export default solution;
