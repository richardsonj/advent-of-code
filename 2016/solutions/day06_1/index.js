const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n");
};

const calculateSolution = (input) => {
  let chars = [];
  for (let x = 0; x < input[0].length; x++) {
    chars.push({});
  }
  for (let word of input) {
    for (let x = 0; x < word.length; x++) {
      chars[x][word[x]] ? chars[x][word[x]]++ : (chars[x][word[x]] = 1);
    }
  }
  let answer = "";
  for (let charSet of chars) {
    let candidates = Object.keys(charSet);
    candidates.sort((left, right) => charSet[right] - charSet[left]);
    answer += candidates[0];
  }
  return answer;
};

export default solution;
