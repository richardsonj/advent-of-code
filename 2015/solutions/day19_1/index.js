const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  const [transitions, start] = input.split("\r\n\r\n");
  return [
    start,
    transitions.split("\r\n").reduce((acc, curr) => {
      const [beg, end] = curr.split(" => ");
      acc[beg] ? acc[beg].push(end) : (acc[beg] = [end]);
      return acc;
    }, {}),
  ];
};

const calculateSolution = (parsedInput) => {
  const [start, transitions] = parsedInput;
  let atoms = start.match(/[A-Z][a-z]?/g);
  const uniqueMolecules = new Set();
  for (let atomIndex in atoms) {
    if (transitions[atoms[atomIndex]]) {
      for (let transition of transitions[atoms[atomIndex]]) {
        let newMolecule = [...atoms];
        newMolecule[atomIndex] = transition;
        uniqueMolecules.add(newMolecule.join(""));
      }
    }
  }
  return uniqueMolecules.size;
};

export default solution;
