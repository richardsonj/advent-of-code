const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input
    .split("\n")
    .map((row) => {
      const parts = row.split(" | ");
      const [card, number, ...winners] = parts[0].split(/ +/);
      const numbers = parts[1].split(/ +/);
      return {
        id: number.split(":")[0],
        winners: winners.map((val) => +val),
        numbers: numbers.map((val) => +val),
      };
    })
    .reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
};

const calculateSolution = (input) => {
  const memo = {};
  let total = 0;
  for (const card of Object.values(input)) {
    total += evaluate(card, input, memo);
  }
  return total;
};

const evaluate = (card, input, memo) => {
  if (Object.keys(memo).includes(card.id)) return memo[card.id];
  let total = 1;
  const winning = card.numbers.filter((num) => card.winners.includes(num)).length;
  for (let x = 1; x <= winning; x++) {
    if (x >= input.length) console.log("fuck");
    total += evaluate(input[+card.id + x], input, memo);
  }
  memo[card.id] = total;
  return total;
};

export default solution;
