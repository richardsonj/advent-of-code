const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => line.split(""));
};

const calculateSolution = (input) => {
  const keypad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];
  const pos = [1, 1];

  let code = "";

  for (const inst of input) {
    for (const dir of inst) {
      switch (dir) {
        case "U":
          pos[0] > 0 ? pos[0]-- : undefined;
          break;
        case "L":
          pos[1] > 0 ? pos[1]-- : undefined;
          break;
        case "D":
          pos[0] < 2 ? pos[0]++ : undefined;
          break;
        case "R":
          pos[1] < 2 ? pos[1]++ : undefined;
          break;
      }
    }
    code += keypad[pos[0]][pos[1]];
  }
  return code;
};

export default solution;
