const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return parseInt(input);
};

const calculateSolution = (parsedInput) => {
  let factors = new Set();
  factors.add(0);
  let num = 1;
  while ([...factors].reduce((a,c)=>a+c)*11 < parsedInput) {
    num++;
    factors = factorize(num);
  }
  return num;
};

const factorize = (num) => {
  let factors = new Set();
  factors.add(num);
  for (let x = Math.ceil(num/50); x <= Math.ceil(num/2); x++) {
    if (!x) continue;
    if (num % x === 0) {
      factors.add(x);
    }
  }
  return factors;
}

export default solution;
