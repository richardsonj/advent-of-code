const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    const parts = row.split(" | ");
    const [card, number, ...winners] = parts[0].split(/ +/);
    const numbers = parts[1].split(/ +/);
    return { winners: winners.map((val) => +val), numbers: numbers.map((val) => +val) };
  });
};

const calculateSolution = (input) => {
  return input
    .map((row) => {
      const winning = row.numbers.filter((num) => row.winners.includes(num));
      if (winning.length) {
        return 2 ** (winning.length - 1);
      }
      return 0;
    })
    .reduce((acc, curr) => acc + curr, 0);
};

export default solution;
