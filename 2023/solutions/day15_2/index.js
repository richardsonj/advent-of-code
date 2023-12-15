const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split(",").map((item) => {
    const match = item.match(/([a-z]+)([=-])([0-9]*)/);
    return { id: match[1], op: match[2], focal: match[3] };
  });
};

const calculateSolution = (input) => {
  const map = {};
  for (const item of input) {
    const hash = getHash(item.id);
    const list = map[hash] || [];
    if (!map[hash]) {
      map[hash] = list;
    }
    if (item.op === "-") {
      let index;
      for (let x = 0; x < list.length; x++) {
        if (list[x].id === item.id) {
          index = x;
          break;
        }
      }
      if (index !== undefined) {
        list.splice(index, 1);
      }
    } else if (item.op === "=") {
      let replaced = false;
      for (let x = 0; x < list.length; x++) {
        if (list[x].id === item.id) {
          list[x] = { id: item.id, focal: item.focal };
          replaced = true;
          break;
        }
      }
      if (!replaced) {
        list.push({ id: item.id, focal: item.focal });
      }
    }
  }
  let total = 0;
  // eslint-disable-next-line guard-for-in
  for (const key in map) {
    const boxNumber = +key;
    const list = map[key];
    for (let x = 0; x < list.length; x++) {
      total += (boxNumber + 1) * (x + 1) * list[x].focal;
    }
  }
  return total;
};

function getHash(item) {
  let current = 0;
  for (let x = 0; x < item.length; x++) {
    current += item.charCodeAt(x);
    current *= 17;
    current %= 256;
  }
  return current;
}

export default solution;
