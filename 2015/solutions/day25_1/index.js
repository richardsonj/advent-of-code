const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  const [, ...rest] = input.match(
    /To continue, please consult the code grid in the manual.  Enter the code at row (\d*), column (\d*)\./
  );
  return rest;
};

const calculateSolution = (coords) => {
  let row = parseInt(coords[0]);
  let col = parseInt(coords[1]);
  let position = addFrom(row+1, row + col - 1, addFrom(1, row-1, 1));

  let val = 20151125;
  for (let x = 1; x < position; x++) {
    val = (val*252533) % 33554393;
  }

  return val;
};

const addFrom = (start, end, digit) => {
  let total = digit;
  for (let x = start; x <= end; x++) {
    total += x;
  }
  return total;
};

export default solution;
