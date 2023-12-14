import { e } from "mathjs";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  const [directions, nodes] = input.split("\n\n");
  const nodeMap = nodes.split("\n").reduce((acc, curr) => {
    const [key, branches] = curr.split(" = ");
    const [left, right] = branches.split(", ");

    acc[key] = { L: left.replace("(", ""), R: right.replace(")", "") };
    return acc;
  }, {});
  return { directions: directions.split(""), nodeMap };
};

const calculateSolution = (input) => {
  let node = "AAA";
  let directionIndex = 0;
  let count = 0;
  while (node !== "ZZZ") {
    node = input.nodeMap[node][input.directions[directionIndex]];
    directionIndex++;
    directionIndex %= input.directions.length;
    count++;
  }
  return count;
};

export default solution;
