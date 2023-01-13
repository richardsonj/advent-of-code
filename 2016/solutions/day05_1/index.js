import md5 from "md5";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input;
};

const calculateSolution = (input) => {
  let password = "";
  for (let x = 0; password.length < 8; x++) {
    const hash = md5(`${input}${x}`);
    if (hash.startsWith("00000")) {
      password += hash[5];
    }
  }
  return password;
};

export default solution;
