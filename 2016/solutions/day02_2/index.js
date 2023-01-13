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
    ["", "", "1", "", ""],
    ["", "2", "3", "5", ""],
    ["5", "6", "7", "8", "9"],
    ["", "A", "B", "C", ""],
    ["", "", "D", "", ""],
  ];
  const pos = [2, 0];

  let code = "";

  for (const inst of input) {
    for (const dir of inst) {
      switch (dir) {
        case "U":
          pos[0] > 0 && keypad[pos[0] - 1][pos[1]] !== "" ? pos[0]-- : undefined;
          break;
        case "L":
          pos[1] > 0 && keypad[pos[0]][pos[1] - 1] !== "" ? pos[1]-- : undefined;
          break;
        case "D":
          pos[0] < 4 && keypad[pos[0] + 1][pos[1]] !== "" ? pos[0]++ : undefined;
          break;
        case "R":
          pos[1] < 4 && keypad[pos[0]][pos[1] + 1] !== "" ? pos[1]++ : undefined;
          break;
      }
    }
    code += keypad[pos[0]][pos[1]];
  }
  return code;
};

export default solution;
