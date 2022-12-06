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
  while ([...factors].reduce((a,c)=>a+c)*10 < parsedInput) {
    num++;
    if (num*10 > parsedInput){
      throw new Error("Missed it");
    }
    factors = factorize(num);
  }
  return num;
};

const factorize = (num) => {
  let factors = new Set();
  factors.add(1);
  factors.add(num);
  for (let x = 2; x <= Math.ceil(Math.sqrt(num)); x++) {
    if (num % x === 0) {
      factors.add(x);
      factors.add(num/x);
    }
  }
  return factors;
}

export default solution;
