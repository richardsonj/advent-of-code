const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const cardValueMap = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,
};

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    const [hand, bid] = row.split(" ");
    return { hand: hand.split(""), bid: +bid };
  });
};

const calculateSolution = (input) => {
  for (const round of input) {
    calculateHandValue(round);
  }

  input.sort((left, right) => left.value - right.value);
  return input.reduce((acc, curr, index) => acc + curr.bid * (index + 1), 0);
};

const calculateHandValue = (round) => {
  const { hand } = round;
  let handValue = 0;
  const cardMap = {};
  for (const card of hand) {
    if (!cardMap[card]) {
      cardMap[card] = 0;
    }
    cardMap[card]++;
  }
  const cardCounts = Object.values(cardMap);
  if (cardCounts.length === 1) {
    handValue += 7 * 13 ** 10;
  } else if (cardCounts.length === 2 && cardCounts.includes(4)) {
    handValue += 6 * 13 ** 10;
  } else if (cardCounts.length === 2 && cardCounts.includes(3)) {
    handValue += 5 * 13 ** 10;
  } else if (cardCounts.length === 3 && cardCounts.includes(3)) {
    handValue += 4 * 13 ** 10;
  } else if (cardCounts.length === 3 && cardCounts.includes(2)) {
    handValue += 3 * 13 ** 10;
  } else if (cardCounts.length === 4 && cardCounts.includes(2)) {
    handValue += 2 * 13 ** 10;
  } else {
    handValue += 1 * 13 ** 10;
  }

  let cardCounter = 5;
  for (const cardValue of hand) {
    handValue += cardValueMap[cardValue] * 13 ** cardCounter;
    cardCounter--;
  }

  round.value = handValue;
};

export default solution;
