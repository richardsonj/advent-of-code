const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split(" ").map(val=> parseInt(val));
};

const calculateSolution = (input) => {
  const seen = [];
  let count = 0;
  let key = input.join("-");
  while (!seen.includes(key)) {
    seen.push(key);
    const maxVal = Math.max(...input);
    let startIndex = 0;
    while (input[startIndex] !== maxVal) {
      startIndex++;
    }
   let index = startIndex;
   input[index] = 0;
    for (let val = maxVal; val > 0; val--) {
      index++;
      index %= input.length;
      input[index]++;
    }
    key = input.join("-");
    count++;
  }

  return count;
};

export default solution;
