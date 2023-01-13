import Computer from "../../Computer.js";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n");
};

const calculateSolution = (input) => {
  const instructionParser = (inst) => inst.split(" ");
  const instructionSet = {
    cpy: (registers, params) => {
      registers[params[1]] = Number.isInteger(parseInt(params[0]))
        ? parseInt(params[0])
        : registers[params[0]];
      return 1;
    },
    inc: (registers, params) => {
      registers[params[0]]++;
      return 1;
    },
    dec: (registers, params) => {
      registers[params[0]]--;
      return 1;
    },
    jnz: (registers, params) => {
      const left = Number.isInteger(parseInt(params[0]))
        ? parseInt(params[0])
        : registers[params[0]];
      const right = Number.isInteger(parseInt(params[1]))
        ? parseInt(params[1])
        : registers[params[1]];
      return left ? right : 1;
    },
    tgl: (registers, params, code, index) => {
      const target = registers[params[0]] + index;
      if (target >= code.length) {
        return 1;
      }
      if (code[target].includes("inc")) {
        code[target] = code[target].replace("inc", "dec");
      } else if (code[target].includes("dec")) {
        code[target] = code[target].replace("dec", "inc");
      } else if (code[target].includes("tgl")) {
        code[target] = code[target].replace("tgl", "inc");
      } else if (code[target].includes("jnz")) {
        code[target] = code[target].replace("jnz", "cpy");
      } else if (code[target].includes("cpy")) {
        code[target] = code[target].replace("cpy", "jnz");
      }
      return 1;
    },
  };
  const registers = ["a", "b", "c", "d"];
  const computer = new Computer(instructionSet, registers, instructionParser);
  computer.registers.a = 7;
  computer.process(input);
  return computer.registers.a;
};

export default solution;
