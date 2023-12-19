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
  const { filters, parts } = input;
  const A = [];
  for (const part of parts) {
    let workflow = filters.in;
    while (workflow !== "A" && workflow !== "R") {
      for (const rule of workflow) {
        const nextWorkflow = applyRule(rule, part, filters);
        if (nextWorkflow) {
          workflow = nextWorkflow;
          break;
        }
      }
      if (workflow === "A") {
        A.push(part);
      }
    }
  }

  return A.reduce((acc, curr) => acc + curr.x + curr.m + curr.a + curr.s, 0);
};

export default solution;
function applyRule(rule, part, filters) {
  const { variable, op, value, target } = rule;
  switch (op) {
    case ">":
      if (part[variable] > value) {
        return getNextWorkflow(target, filters);
      }
      break;
    case "<":
      if (part[variable] < value) {
        return getNextWorkflow(target, filters);
      }
      break;
    case undefined:
      return getNextWorkflow(target, filters);
  }
  return undefined;
}

function getNextWorkflow(target, filters) {
  if (target === "A" || target === "R") {
    return target;
  }
  return filters[target];
}
