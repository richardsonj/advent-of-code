const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  const [seedsStr, ...mapStrs] = input.split("\n\n");

  const seeds = seedsStr
    .split(" ")
    .slice(1)
    .map((val) => +val);
  const maps = {};
  for (const mapStr of mapStrs) {
    const [name, ...nums] = mapStr.split("\n");
    maps[name] = nums.map((row) => {
      const [destStart, sourceStart, length] = row.split(" ").map((val) => +val);
      return { destStart, sourceStart, length };
    });
  }
  return { seeds, maps };
};

const calculateSolution = (input) => {
  return Math.min(
    ...input.seeds
      .map(mapValue(input.maps["seed-to-soil map:"]))
      .map(mapValue(input.maps["soil-to-fertilizer map:"]))
      .map(mapValue(input.maps["fertilizer-to-water map:"]))
      .map(mapValue(input.maps["water-to-light map:"]))
      .map(mapValue(input.maps["light-to-temperature map:"]))
      .map(mapValue(input.maps["temperature-to-humidity map:"]))
      .map(mapValue(input.maps["humidity-to-location map:"]))
  );
};

function mapValue(mapping) {
  return (seed) => {
    for (const map of mapping) {
      if (seed >= map.sourceStart && seed <= map.sourceStart + map.length) {
        return seed - map.sourceStart + map.destStart;
      }
    }
    return seed;
  };
}

export default solution;
