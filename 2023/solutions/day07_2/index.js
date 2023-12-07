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
  "2J": 0,
  "3J": 0,
  "4J": 0,
  "5J": 0,
  "6J": 0,
  "7J": 0,
  "8J": 0,
  "9J": 0,
  TJ: 0,
  QJ: 0,
  KJ: 0,
  AJ: 0,
  Q: 10,
  K: 11,
  A: 12,
};

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    const [hand, bid] = row.split(" ");
    return { hand: hand.split(""), bid: +bid };
  });
};

const calculateSolution = (input) => {
  for (const round of input) {
    round.value = calculateHandValueWithJokers(round.hand);
  }

  input.sort((left, right) => left.value - right.value);
  return input.reduce((acc, curr, index) => acc + curr.bid * (index + 1), 0);
};

const calculateHandValueWithJokers = (hand) => {
  if (hand.join("") === "JJJJJ") {
    return calculateHandValue(["AJ", "AJ", "AJ", "AJ", "AJ"]);
  }
  if (!hand.includes("J")) {
    return calculateHandValue(hand);
  }
  let maxValue = 0;
  for (let x = 0; x < hand.length; x++) {
    const newHand = [...hand];
    if (hand[x] !== "J") {
      for (let y = 0; y < hand.length; y++) {
        if (hand[y] === "J") {
          newHand[y] = `${hand[x]}J`;
        }
      }
      maxValue = Math.max(maxValue, calculateHandValue(newHand));
    }
  }
  return maxValue;
};

const calculateHandValue = (hand) => {
  let handValue = 0;
  const cardMap = {};
  for (const card of hand) {
    const [chr] = card.split("");
    if (!cardMap[chr]) {
      cardMap[chr] = 0;
    }
    cardMap[chr]++;
  }
  const cardCounts = Object.values(cardMap);
  if (cardCounts.length === 1) {
    handValue += 6 * 13 ** 5;
  } else if (cardCounts.length === 2 && cardCounts.includes(4)) {
    handValue += 5 * 13 ** 5;
  } else if (cardCounts.length === 2 && cardCounts.includes(3)) {
    handValue += 4 * 13 ** 5;
  } else if (cardCounts.length === 3 && cardCounts.includes(3)) {
    handValue += 3 * 13 ** 5;
  } else if (cardCounts.length === 3 && cardCounts.includes(2)) {
    handValue += 2 * 13 ** 5;
  } else if (cardCounts.length === 4 && cardCounts.includes(2)) {
    handValue += 1 * 13 ** 5;
  } else {
    handValue += 0 * 13 ** 5;
  }

  let cardCounter = 4;
  for (const cardValue of hand) {
    handValue += cardValueMap[cardValue] * 13 ** cardCounter;
    cardCounter--;
  }

  return handValue;
};

export default solution;
