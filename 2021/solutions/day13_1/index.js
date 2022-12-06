const day13_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  let parts = input.split("\r\n\r\n");
  let coords = parts[0].split("\r\n").map((coord)=> coord.split(","));
  let folds = parts[1].split("\r\n").map(row=>row.split("fold along ")[1].split("="));
  for (let coord in coords) {
    coords[coord][0] = parseInt(coords[coord][0]);
    coords[coord][1] = parseInt(coords[coord][1]);
  }
  for (let fold in folds) {
    folds[fold][1] = parseInt(folds[fold][1]);
  }
  return [coords, folds];
};

const calculateSolution = (parsedInput) => {
  let coords = parsedInput[0];
  let folds = parsedInput[1];

  for (let fold of [folds[0]]) {
    for (let coord of coords) {
      let axis = fold[0];
      let foldIndex = (fold[1]);
      if (axis === "x"){
        if (coord[0] > foldIndex) {
          coord[0] = 2*foldIndex-coord[0];
        }
      }else {
        if (coord[1] > foldIndex) {
          coord[1] = 2*foldIndex-coord[1];
        }
      }
    }
  }
  removeDups(coords);
  coords = coords.filter(val=>val);
  console.log(coords);
  return coords.length;
};

const removeDups = (coords) => {
  for (let coord1 in coords) {
    for (let coord2 in coords) {
      if (coords[coord1] !== coords[coord2] && coords[coord1][0] === coords[coord2][0] && coords[coord1][1] === coords[coord2][1]){
        delete coords[coord2];
        break;
      }
    }
  }
};

export default day13_1;
