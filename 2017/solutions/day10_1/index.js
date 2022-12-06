const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split(",").map((val) => parseInt(val));
};

const calculateSolution = (input) => {
  const count = 256;
  const list = [...Array(count).keys()];
  let currentPosition = 0;
  let skip = 0;

  for (let length of input) {
    let start = currentPosition;
    let end = (currentPosition + length - 1) % count;

    while (true) {
      const temp = list[start];
      list[start] = list[end];
      list[end] = temp;
      if ((end - start + count) % count <= 1) {
        break;
      }
      start += count;
      start++;
      start %= count;
      end += count;
      end--;
      end %= count;
    };

    currentPosition += (length + skip);
    currentPosition %= count;
    skip++;
  }

  return list[0] * list[1];
};

export default solution;
