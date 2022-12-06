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
  let count = 0;
  const connected = ["0"];
  const notVisited = Object.keys(input);
  while (notVisited.length > 0){
    count++;
    //console.log(notVisited);
    findConnected(notVisited[0], connected, input, notVisited);
  }
  return count;
};

const findConnected = (id, connected, connections, notVisited) => {
  const notVisitedIndex = notVisited.findIndex((elem)=>elem === id);
  if (notVisitedIndex !== -1) {
    notVisited.splice(notVisitedIndex, 1);
  }
  for (let connection of connections[id]) {
    if (!connected.includes(connection)) {
      connected.push(connection);
      findConnected(connection, connected, connections, notVisited);
    }
  }
}

export default solution;
