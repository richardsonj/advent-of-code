const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input
    .split("\n")
    .map((row) => row.split(" <-> "))
    .reduce((acc, curr) => {
      acc[curr[0]] = curr[1].split(", ");
      return acc;
    }, {});
};

const calculateSolution = (input) => {
  const connected = ["0"];
  findConnected("0", connected, input);
  return connected.length;
};

const findConnected = (id, connected, connections) => {
  for (let connection of connections[id]) {
    if (!connected.includes(connection)) {
      connected.push(connection);
      findConnected(connection, connected, connections);
    }
  }
}

export default solution;
