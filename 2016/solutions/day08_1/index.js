const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => {
    let match = line.match(/rect (\d*)x(\d*)/);
    if (match) {
      return { type: "rect", x: parseInt(match[1]), y: parseInt(match[2]) };
    }
    match = line.match(/rotate column x=(\d*) by (\d*)/);
    if (match) {
      return {
        type: "rotate",
        col: parseInt(match[1]),
        amount: parseInt(match[2]),
      };
    }
    match = line.match(/rotate row y=(\d*) by (\d*)/);
    if (match) {
      return {
        type: "rotate",
        row: parseInt(match[1]),
        amount: parseInt(match[2]),
      };
    }
  });
};

const calculateSolution = (input) => {
  let screenWidth = 50;
  let screenHeight = 6;
  let screen = [];
  for (let y = 0; y < screenHeight; y++) {
    let row = [];
    for (let x = 0; x < screenWidth; x++) {
      row.push(" ");
    }
    screen.push(row);
  }

  for (let action of input) {
    switch (action.type) {
      case "rotate":
        rotate(action, screen);
        break;
      case "rect":
        rect(action, screen);
        break;
    }
  }

  return screen.reduce(
    (acc, curr) =>
      acc + curr.reduce((acc2, curr2) => acc2 + (curr2 === "#" ? 1 : 0), 0),
    0
  );
};

const rotate = (action, screen) => {
  if (action.col !== undefined) {
    let oldCol = [...screen.map(row=>row[action.col])];
    
    for (let x = 0; x < screen.length; x++) {
        screen[(x + action.amount) % screen.length][action.col] = oldCol[x];
    }
  } else {
    let oldRow = [...screen[action.row]];
    let width = screen[action.row].length;
    for (let x = 0; x < width; x++) {
      screen[action.row][(x + action.amount) % width] = oldRow[x];
    }
  }
};

const rect = (action, screen) => {
  for (let y = 0; y < action.y; y++) {
    for (let x = 0; x < action.x; x++) {
      screen[y][x] = "#";
    }
  }
};

export default solution;
