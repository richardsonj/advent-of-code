const day10_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n");
};

const calculateSolution = (parsedInput) => {
  //console.log(parsedInput);
  const closingChars = { "{": "}", "(": ")", "<": ">", "[": "]" };
  const scores = { "}": 1197, ")": 3, ">": 25137, "]": 57 };
  let score = 0;
  for (let line of parsedInput) {
    let stack = [];
    for (let ch of line) {
      if (["<", "{", "[", "("].includes(ch)) {
        stack.push(ch);
      } else {
        if (stack.length !== 0){
            var openCh = stack.pop();
        }
        if (ch !== closingChars[openCh]) {
          score += scores[ch];
          break;
        }
      }
    }
  }
  return score;
};

export default day10_1;
