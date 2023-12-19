const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  const [filtersStr, partsStr] = input.split("\n\n");
  const filters = filtersStr
    .split("\n")
    .map((filterStr) => {
      const [name, rulesStr] = filterStr.split("{");
      const rules = rulesStr.substring(0, rulesStr.length - 1).split(",");
      const filtersArr = [];
      for (const rule of rules) {
        if (rule.includes(":")) {
          const [opStr, target] = rule.split(":");
          const variable = opStr.substring(0, 1);
          const op = opStr.substring(1, 2);
          const value = +opStr.substring(2);
          filtersArr.push({ variable, op, value, target });
        } else {
          filtersArr.push({ target: rule });
        }
      }
      return { name, filtersArr };
    })
    .reduce((acc, curr) => {
      acc[curr.name] = curr.filtersArr;
      return acc;
    }, {});
  const parts = partsStr.split("\n").map((row) => {
    const match = row.match(/{x=([0-9]+),m=([0-9]+),a=([0-9]+),s=([0-9]+)}/);
    return { x: +match[1], m: +match[2], a: +match[3], s: +match[4] };
  });
  return { filters, parts };
};

const calculateSolution = (input) => {
  const { filters } = input;
  const A = [];
  const partRanges = { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] };
  const todo = [{ part: partRanges, filter: filters.in }];
  while (todo.length > 0) {
    const { part, filter } = todo.pop();
    const remainder = {
      x: [...part.x],
      m: [...part.m],
      a: [...part.a],
      s: [...part.s],
    };
    for (const rule of filter) {
      const { variable, op, value, target } = rule;
      const matched = {
        x: [...remainder.x],
        m: [...remainder.m],
        a: [...remainder.a],
        s: [...remainder.s],
      };
      if (op === ">") {
        if (matched[variable][0] <= value && matched[variable][1] > value) {
          matched[variable][0] = value + 1;
          remainder[variable][1] = value;
        } else if (matched[variable][0] <= value) {
          continue;
        } else {
          remainder[variable] = undefined;
        }
      } else if (op === "<") {
        if (matched[variable][1] >= value && matched[variable][0] < value) {
          matched[variable][1] = value - 1;
          remainder[variable][0] = value;
        } else if (matched[variable][1] >= value) {
          continue;
        } else {
          remainder[variable] = undefined;
        }
      }
      if (target === "A") {
        A.push(matched);
      } else if (target !== "R") {
        todo.push({ part: matched, filter: filters[target] });
      }
      if (!remainder[variable]) break;
    }
  }

  let total = 0;

  for (const partRange of A) {
    total +=
      (partRange.x[1] - partRange.x[0] + 1) *
      (partRange.m[1] - partRange.m[0] + 1) *
      (partRange.a[1] - partRange.a[0] + 1) *
      (partRange.s[1] - partRange.s[0] + 1);
  }

  return total;
};

export default solution;
