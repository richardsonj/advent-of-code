import Node from "../../Node.js";

const day12_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  let nodes = {};
  input.split("\r\n").forEach((line) => {
    let lineNodes = line.split("-");
    let node0;
    let node1;
    if (Object.keys(nodes).includes(lineNodes[0])) {
      node0 = nodes[lineNodes[0]];
    } else {
      node0 = new Node();
      node0.name = lineNodes[0];
      nodes[lineNodes[0]] = node0;
    }
    if (Object.keys(nodes).includes(lineNodes[1])) {
      node1 = nodes[lineNodes[1]];
    } else {
      node1 = new Node();
      node1.name = lineNodes[1];
      nodes[lineNodes[1]] = node1;
    }

    node1.neighbors.push(node0);
    node0.neighbors.push(node1);
  });

  return nodes;
};

const calculateSolution = (parsedInput) => {
  let startNode = parsedInput["start"];
  return paths(startNode, []);
};

const paths = (currentNode, visitedNodes) => {
  let count = 0;
  if (currentNode.name == 'end') {
    return 1;
  }
  for (let neighbor of currentNode.neighbors) {
    if (!visitedNodes.includes(neighbor.name)) {
      if (isBig(currentNode.name)) {
        count += paths(neighbor, [...visitedNodes]);
      }else {
        count += paths(neighbor, [...visitedNodes, currentNode.name]);
      }
    }
  }
  return count;
};

const isBig = (name) => {
  return name[0] >= 'A' && name[0] <= 'Z';
}

export default day12_1;
