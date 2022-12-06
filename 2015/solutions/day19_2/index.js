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
  const [target, transitions] = parsedInput;

  let atoms = target.match(/(?:[A-Z][a-z]?|e)/g);

  let Rns = atoms.filter(val=>val==="Rn").length;
  let Ars = atoms.filter(val=>val==="Ar").length;
  let Ys = atoms.filter(val=>val==="Y").length;

  return atoms.length - Rns - Ars - 2*Ys-1;
};

export default solution;
