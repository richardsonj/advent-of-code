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
  let password = "        ";
  for (
    let x = 0;
    password.split("").filter((val) => val === " ").length > 0;
    x++
  ) {
    let hash = md5(`${input}${x}`);
    if (hash.startsWith("00000")) {
      if (hash[5] >= 0 && hash[5] < 8 && password[hash[5]] === " ") {
        password =
          password.substring(0, parseInt(hash[5])) +
          hash[6] +
          password.substring(parseInt(hash[5]) + 1);
      }
    }
  }
  return password;
};

export default solution;
