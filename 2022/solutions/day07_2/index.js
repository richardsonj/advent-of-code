const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) => input.split("\n");

const calculateSolution = (input) => {
  const root = { files: {}, folders: {}, parent: undefined };
  let currentDirectory = root;
  for (const line of input) {
    const args = line.split(" ");
    if (args[0] === "$") {
      if (args[1] === "ls") {
        continue;
      } else if (args[1] === "cd") {
        if (args[2] === "/") {
          currentDirectory = root;
        } else if (args[2] === "..") {
          currentDirectory = currentDirectory.parent;
        } else {
          currentDirectory = currentDirectory.folders[args[2]];
        }
      }
    } else if (args[0] === "dir") {
      currentDirectory.folders[args[1]] = { files: {}, folders: {}, parent: currentDirectory };
    } else {
      currentDirectory.files[args[1]] = parseInt(args[0]);
    }
  }

  const results = [];
  const rootSize = getDirectorySize(root, results);
  const availableSpace = 70000000 - rootSize;
  const spaceNeeded = 30000000 - availableSpace;
  results.sort();
  for (const size of results) {
    if (size > spaceNeeded) {
      return size;
    }
  }
};

const getDirectorySize = (dir, results) => {
  const filesTotal = Object.values(dir.files).reduce((a, b) => a + b, 0);
  const foldersTotal = Object.values(dir.folders)
    .map((folder) => getDirectorySize(folder, results))
    .reduce((a, b) => a + b, 0);
  const size = filesTotal + foldersTotal;
  results.push(size);
  return size;
};

export default solution;
