import { lcm } from "mathjs";

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
  let currentNodes = Object.keys(input.nodeMap).filter((node) => node.charAt(2) === "A");
  let directionIndex = 0;
  let count = 0;
  const distanceToZ = {};
  while (!currentNodes.every((node) => node.charAt(2) === "Z")) {
    // eslint-disable-next-line no-loop-func
    currentNodes = currentNodes.map((node, index) => {
      const next = input.nodeMap[node][input.directions[directionIndex]];
      if (next.charAt(2) === "Z") {
        if (!distanceToZ[index]) {
          distanceToZ[index] = [];
        }
        distanceToZ[index].push(count + 1);
      }
      return next;
    });
    directionIndex++;
    directionIndex %= input.directions.length;
    count++;
    if (
      Object.keys(distanceToZ).length === currentNodes.length &&
      Object.values(distanceToZ).every((arr) => arr.length > 4)
    ) {
      break;
    }
  }
  const cycleLengths = Object.values(distanceToZ).map((distances) => distances[0]);

  let current = 1;
  for (const cycle of cycleLengths) {
    const result = lcm(current, cycle);
    current = result;
  }

  return current;
};

export default solution;
