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
  const expandedSeeds = [];
  for (let x = 0; x < seeds.length; x += 2) {
    expandedSeeds.push({ start: seeds[x], length: seeds[x + 1] });
  }
  const maps = {};
  for (const mapStr of mapStrs) {
    const [name, ...nums] = mapStr.split("\n");
    maps[name] = nums.map((row) => {
      const [destStart, sourceStart, length] = row.split(" ").map((val) => +val);
      return { destStart, sourceStart, length };
    });
  }
  return { seeds: expandedSeeds, maps };
};

const calculateSolution = (input) => {
  let result = Infinity;
  for (const seedRange of input.seeds) {
    console.log(`Starting seed range: ${JSON.stringify(seedRange)}`);
    for (let x = seedRange.start; x < seedRange.start + seedRange.length; x++) {
      let intermediate = mapValue(x, input.maps["seed-to-soil map:"]);
      intermediate = mapValue(intermediate, input.maps["soil-to-fertilizer map:"]);
      intermediate = mapValue(intermediate, input.maps["fertilizer-to-water map:"]);
      intermediate = mapValue(intermediate, input.maps["water-to-light map:"]);
      intermediate = mapValue(intermediate, input.maps["light-to-temperature map:"]);
      intermediate = mapValue(intermediate, input.maps["temperature-to-humidity map:"]);
      intermediate = mapValue(intermediate, input.maps["humidity-to-location map:"]);
      result = Math.min(result, intermediate);
    }
  }
  return result;
};

function mapValue(seed, mapping) {
  for (const map of mapping) {
    if (seed >= map.sourceStart && seed < map.sourceStart + map.length) {
      return seed - map.sourceStart + map.destStart;
    }
  }
  return seed;
}

export default solution;
