const day22_2 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => {
    const [command, box] = line.split(" ");
    return {
      command,
      ...box.split(",").reduce((acc, curr) => {
        const [axis, edges] = curr.split("=");
        acc[axis] = edges.split("..").map((num) => parseInt(num));
        return acc;
      }, {}),
    };
  });
};

const calculateSolution = (parsedInput) => {
  let onRegions = [];
  for (let step of parsedInput) {
    let overlapped = [];
    for (let region of onRegions) {
      if (overlaps(region, [step.x, step.y, step.z])) {
        overlapped.push(region);
      }
    }
    if (overlapped.length > 0) {
      onRegions = onRegions.filter((region) => !overlapped.includes(region));
      for (let overlap of overlapped) {
        let remainingRegions = splitRegion(overlap, [step.x, step.y, step.z]);
        onRegions.push(...remainingRegions);
      }
    }
    if (step.command === "on") {
      onRegions.push([step.x, step.y, step.z]);
    }
  }
  return countOn(onRegions);
};

const countOn = (regions) => {
  let count = 0;
  for (let region of regions) {
    count +=
      (region[0][1] - region[0][0] + 1) *
      (region[1][1] - region[1][0] + 1) *
      (region[2][1] - region[2][0] + 1);
  }
  return count;
};

const overlaps = (region1, region2) => {
  for (let i = 0; i < 3; i++) {
    if (region1[i][0] > region2[i][1] || region1[i][1] < region2[i][0]) {
      return false;
    }
  }
  return true;
};

const splitRegion = (onRegion, stepRegion) => {

  let xs = [...onRegion[0], ...stepRegion[0]];
  xs.sort((a,b)=>a-b);
  let ys = [...onRegion[1], ...stepRegion[1]];
  ys.sort((a,b)=>a-b);
  let zs = [...onRegion[2], ...stepRegion[2]];
  zs.sort((a,b)=>a-b);
  let overlap = [
    [xs[1], xs[2]],
    [ys[1], ys[2]],
    [zs[1], zs[2]],
  ];

  let returnRegions = [];
  let negX = onRegion[0][0] < overlap[0][0];
  let posX = onRegion[0][1] > overlap[0][1];
  let negY = onRegion[1][0] < overlap[1][0];
  let posY = onRegion[1][1] > overlap[1][1];
  let negZ = onRegion[2][0] < overlap[2][0];
  let posZ = onRegion[2][1] > overlap[2][1];

  if (negX) {
    returnRegions.push([
      [onRegion[0][0], overlap[0][0] - 1],
      onRegion[1],
      onRegion[2],
    ]);
  }
  if (posX) {
    returnRegions.push([
      [overlap[0][1] + 1, onRegion[0][1]],
      onRegion[1],
      onRegion[2],
    ]);
  }
  if (negY) {
    returnRegions.push([
      overlap[0],
      [onRegion[1][0], overlap[1][0] - 1],
      onRegion[2],
    ]);
  }
  if (posY) {
    returnRegions.push([
      overlap[0],
      [overlap[1][1] + 1, onRegion[1][1]],
      onRegion[2],
    ]);
  }
  if (negZ) {
    returnRegions.push([
      overlap[0],
      overlap[1],
      [onRegion[2][0], overlap[2][0] - 1],
    ]);
  }
  if (posZ) {
    returnRegions.push([
      overlap[0],
      overlap[1],
      [overlap[2][1] + 1, onRegion[2][1]],
    ]);
  }

  return returnRegions;
};

export default day22_2;
