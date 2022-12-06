const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((row) => {
    const match = row.match(
      /([a-z]+) \(([0-9]+)\)(?: -> ([a-z]+(?:, [a-z]+)*))?/
    );
    return {
      name: match[1],
      weight: parseInt(match[2]),
      children: match[3]?.split(", ") || [],
      getTotalWeight: function() {
        return this.weight + this.children.reduce((acc, curr) => acc + curr.getTotalWeight(), 0);
      },
    };
  });
};

const calculateSolution = (input) => {
  const root = findRoot(input);
  const programsByName = input.reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {});
  for (const prog of input) {
    for (let childIndex in prog.children) {
      prog.children[childIndex] = programsByName[prog.children[childIndex]];
    }
  }
  return checkBalance(programsByName[root]);
};

const checkBalance = (node) => {
  if (!node.children.length) return undefined;
  const weights = node.children.map((child) =>child.getTotalWeight());
  if (new Set(weights).size === 1) {
    return undefined;
  }
  const targetWeight = weights.length > 2 ? weights[1] : 0;
  for (const child of node.children) {
    const result = checkBalance(child, targetWeight && targetWeight-child.getTotalWeight());
    if (result) {
      return result;
    }
  }

  for (const child of node.children) {
    if (child.getTotalWeight() !== targetWeight) {
      return targetWeight-child.getTotalWeight() + child.weight;
    }
  }
  return undefined;
};

const findRoot = (input) => {
  const programs = input.map(val=>val.name);
  const children = input.reduce((acc, curr)=>acc.concat(curr.children),[])
  const remaining = programs.filter(prog=> !children.includes(prog));
  return remaining[0];
}

export default solution;
