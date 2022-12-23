const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) => input.split("\n").map((row) => row.split(" "));

const calculateSolution = (input) => {
  const choiceScores = { A: 1, B: 2, C: 3 };
  const choices = {
    A: { X: "C", Y: "A", Z: "B" },
    B: { X: "A", Y: "B", Z: "C" },
    C: { X: "B", Y: "C", Z: "A" },
  };
  const winScores = { X: 0, Y: 3, Z: 6 };
  let totalScore = 0;
  for (const round of input) {
    const theirs = round[0];
    const mine = round[1];
    const choiceScore = choiceScores[choices[theirs][mine]];
    const winScore = winScores[mine];
    totalScore += choiceScore + winScore;
  }
  return totalScore;
};

export default solution;
