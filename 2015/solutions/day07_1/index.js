const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => line.split(" -> "));
};

const calculateSolution = (parsedInput) => {
  let nodes = {};
  let nodeInputs = {};
  for (let step of parsedInput) {
    if (!nodes[step[1]]) {
      nodes[step[1]] = { inputs: [] };
    }
    const [inputs, operation] = parseNodeInput(step[0]);
    nodes[step[1]].inputs.push(...inputs);
    if (!operation) {
      nodes[step[1]].op = function () {
        const left =
          isNaN(parseInt(this.inputs[0]))
            ? nodes[this.inputs[0]].op(): parseInt(this.inputs[0]);
        this.op = function () {
          return left;
        };
        return left;
      };
    } else {
      switch (operation) {
        case "AND":
          nodes[step[1]].op = function () {
            const left = parseInt(this.inputs[0]) || nodes[this.inputs[0]].op();
            const right =
              parseInt(this.inputs[1]) || nodes[this.inputs[1]].op();
            this.op = function () {
              return left & right;
            };
            return left & right;
          };
          break;
        case "OR":
          nodes[step[1]].op = function () {
            const left = parseInt(this.inputs[0]) || nodes[this.inputs[0]].op();
            const right =
              parseInt(this.inputs[1]) || nodes[this.inputs[1]].op();
            this.op = function () {
              return left | right;
            };
            return left | right;
          };
          break;
        case "NOT":
          nodes[step[1]].op = function () {
            const left = nodes[this.inputs[0]].op();
            this.op = function () {
              return left ^ 0xffff;
            };
            return left ^ 0xffff;
          };
          break;
        case "LSHIFT":
          nodes[step[1]].op = function () {
            const left = nodes[this.inputs[0]].op();
            const right = parseInt(this.inputs[1]);
            this.op = function () {
              return (left << right) % 0x10000;
            };
            return (left << right) % 0x10000;
          };
          break;
        case "RSHIFT":
          nodes[step[1]].op = function () {
            const left = nodes[this.inputs[0]].op();
            const right = parseInt(this.inputs[1]);
            this.op = function () {
              return left >> right;
            };
            return left >> right;
          };
          break;
        default:
          throw Error("Bad Step " + operation);
      }
    }
  }

  return nodes["a"].op();
};

const parseNodeInput = (input) => {
  let parts = input.split(" ");
  if (parts.length === 1) {
    return [[parts[0]], undefined];
  }
  if (parts.length === 2) {
    return [[parts[1]], "NOT"];
  }
  if (parts.length === 3) {
    return [[parts[0], parts[2]], parts[1]];
  }
};

export default solution;
