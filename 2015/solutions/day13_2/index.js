const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").reduce((acc, line) => {
    let match = line.match(
      /(\w*) would (gain|lose) (\d*) happiness units by sitting next to (\w*)./
    );
    let subject = match[1];
    let direction = match[2];
    let amount = parseInt(match[3]);
    let neighbor = match[4];
    if (!acc[subject]) {
      acc[subject] = {};
    }
    acc[subject][neighbor] = direction === "gain" ? amount : -amount;
    return acc;
  }, {});
};

const calculateSolution = (relationships) => {
  let arrangement = [];
  let maxHappiness = 0;
  arrangement.push("Alice");
  for (let permutation of permute(arrangement, relationships)) {
    maxHappiness = Math.max(
      maxHappiness,
      calculateHappiness(permutation, relationships)
    );
  }
  return maxHappiness;
};

const permute = (arrangement, relationships) => {
  if (arrangement.length === Object.keys(relationships).length) {
    return [arrangement];
  }
  let current = arrangement[arrangement.length - 1];
  let permutations = [];
  for (let relationship in relationships[current]) {
    if (arrangement.includes(relationship)) continue;
    let newArrangement = [...arrangement, relationship];
    permutations.push(...permute(newArrangement, relationships));
  }
  return permutations;
};

const calculateHappiness = (arrangement, relationships) => {
  let happinesses = [];
  for (let x = 0; x < arrangement.length; x++) {
    let current = arrangement[x];
    let right = arrangement[(x + 1) % arrangement.length];
    happinesses.push(relationships[current][right] + relationships[right][current]);
  }
  happinesses.sort((a,b)=>a-b);
  happinesses.splice(0,1)
  return happinesses.reduce((acc, curr)=>acc+curr);
};

export default solution;
