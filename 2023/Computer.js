class Computer {
  constructor(instructionSet, registers, instructionParser) {
    this.instructionSet = instructionSet;
    this.registers = registers.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, {});
    this.instructionParser = instructionParser;
  }

  process = (code) => {
    for (let x = 0; x < code.length; ) {
      const [opCode, ...params] = this.instructionParser(code[x]);
      x += this.instructionSet[opCode](this.registers, params, code, x);
    }
    return this.registers;
  };
}

export default Computer;
