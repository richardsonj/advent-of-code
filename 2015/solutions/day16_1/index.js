const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").reduce((acc, curr) => {
    let match = curr.match(
      /Sue (\d*): (\w*): (\d*), (\w*): (\d*), (\w*): (\d*)/
    );
    let obj = {};
    obj[match[2]] = parseInt(match[3]);
    obj[match[4]] = parseInt(match[5]);
    obj[match[6]] = parseInt(match[7]);
    acc[match[1]] = obj;
    return acc;
  }, {});
};

const calculateSolution = (aunts) => {
  let reading = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  for (let auntNumber in aunts) {
    let traitsMatch = true;
    for (let trait in aunts[auntNumber]) {
      if (reading?.[trait] !== aunts[auntNumber][trait]) {
        traitsMatch = false;
        break;
      }
    }
    if (traitsMatch) {
      return auntNumber;
    }
  }
};

export default solution;
