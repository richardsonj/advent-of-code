const day10_2 = {
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
  const scores = { "{": 3, "(": 1, "<": 4, "[": 2 };
  let lineScores = [];
  for (let line of parsedInput) {
    let stack = [];
    let score = 0;
    let passed = true;
    for (let ch of line) {
      if (["<", "{", "[", "("].includes(ch)) {
        stack.push(ch);
      } else {
        if (stack.length !== 0) {
          var openCh = stack.pop();
        }
        if (ch !== closingChars[openCh]) {
          passed = false;
          break;
        }
      }
    }
    if (passed) {
      while (stack.length > 0) {
        score = score * 5;
        score += scores[stack.pop()];
      }
      lineScores.push(score);
    }
  }

  lineScores.sort((a,b)=> a-b);
  console.log(lineScores);
  return lineScores[Math.floor(lineScores.length / 2)];
};

export default day10_2;
