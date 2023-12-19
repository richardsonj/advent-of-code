class InputParser {
  static parseSimpleGrid(input, nodeMapper = (val) => val) {
    input.split("\n").map((row) => row.split("").map(nodeMapper));
  }
}

export default InputParser;
