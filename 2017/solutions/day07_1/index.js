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
      weight: match[2],
      children: match[3]?.split(", ") || [],
    };
  });
};

const calculateSolution = (input) => {
  const programs = input.map(val=>val.name);
  const children = input.reduce((acc, curr)=>acc.concat(curr.children),[])
  const remaining = programs.filter(prog=> !children.includes(prog));
  return remaining[0];
};

export default solution;
