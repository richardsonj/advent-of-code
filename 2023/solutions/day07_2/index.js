const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const cardValueMap = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  "2J": 1,
  "3J": 1,
  "4J": 1,
  "5J": 1,
  "6J": 1,
  "7J": 1,
  "8J": 1,
  "9J": 1,
  TJ: 1,
  QJ: 1,
  KJ: 1,
  AJ: 1,
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
    handValue += 7 * 13 ** 12;
  } else if (cardCounts.length === 2 && cardCounts.includes(4)) {
    handValue += 6 * 13 ** 12;
  } else if (cardCounts.length === 2 && cardCounts.includes(3)) {
    handValue += 5 * 13 ** 12;
  } else if (cardCounts.length === 3 && cardCounts.includes(3)) {
    handValue += 4 * 13 ** 12;
  } else if (cardCounts.length === 3 && cardCounts.includes(2)) {
    handValue += 3 * 13 ** 12;
  } else if (cardCounts.length === 4 && cardCounts.includes(2)) {
    handValue += 2 * 13 ** 12;
  } else {
    handValue += 1 * 13 ** 12;
  }

  let cardCounter = 5;
  for (const cardValue of hand) {
    handValue += cardValueMap[cardValue] * 13 ** (cardCounter * 2);
    cardCounter--;
  }

  return handValue;
};

export default solution;
