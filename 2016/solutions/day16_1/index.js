const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("").map((val) => parseInt(val));
};

const calculateSolution = (input) => {
  const size = 272;
  let data = input;
  while (data.length < size) {
    data = applyDragon(data);
  }
  data = data.splice(0, size);
  do {
    data = checkSum(data);
  } while (data.length % 2 === 0);
  return data.join("");
};

const applyDragon = (input) => {
  const reversed = [...input].reverse().map((val) => (val ? 0 : 1));
  return [...input, 0, ...reversed];
};

const checkSum = (data) => {
  const checkSum = [];
  for (let x = 0; x < data.length; x += 2) {
    checkSum.push(data[x] === data[x + 1] ? 1 : 0);
  }
  return checkSum;
};

export default solution;
