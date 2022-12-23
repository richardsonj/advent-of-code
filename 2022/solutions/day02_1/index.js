const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) => input.split("\n").map((row) => row.split(" "));

const calculateSolution = (input) => {
  const choiceScores = { X: 1, Y: 2, Z: 3 };
  const winScores = { A: { X: 3, Y: 6, Z: 0 }, B: { X: 0, Y: 3, Z: 6 }, C: { X: 6, Y: 0, Z: 3 } };
  let totalScore = 0;
  for (const round of input) {
    const theirs = round[0];
    const mine = round[1];
    const choiceScore = choiceScores[mine];
    const winScore = winScores[theirs][mine];
    totalScore += choiceScore + winScore;
  }
  return totalScore;
};

export default solution;
