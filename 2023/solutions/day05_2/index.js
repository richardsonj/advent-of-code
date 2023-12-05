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
      let intermediate = mapValue(input.maps["seed-to-soil map:"])(x);
      intermediate = mapValue(input.maps["soil-to-fertilizer map:"])(intermediate);
      intermediate = mapValue(input.maps["fertilizer-to-water map:"])(intermediate);
      intermediate = mapValue(input.maps["water-to-light map:"])(intermediate);
      intermediate = mapValue(input.maps["light-to-temperature map:"])(intermediate);
      intermediate = mapValue(input.maps["temperature-to-humidity map:"])(intermediate);
      intermediate = mapValue(input.maps["humidity-to-location map:"])(intermediate);
      result = Math.min(result, intermediate);
      // result = Math.min(
      //   result,
      //   ...[x]
      //     .map(mapValue(input.maps["seed-to-soil map:"]))
      //     .map(mapValue(input.maps["soil-to-fertilizer map:"]))
      //     .map(mapValue(input.maps["fertilizer-to-water map:"]))
      //     .map(mapValue(input.maps["water-to-light map:"]))
      //     .map(mapValue(input.maps["light-to-temperature map:"]))
      //     .map(mapValue(input.maps["temperature-to-humidity map:"]))
      //     .map(mapValue(input.maps["humidity-to-location map:"]))
      // );
    }
  }
  return result;
};

function mapValue(mapping) {
  return (seed) => {
    for (const map of mapping) {
      if (seed >= map.sourceStart && seed < map.sourceStart + map.length) {
        return seed - map.sourceStart + map.destStart;
      }
    }
    return seed;
  };
}

export default solution;
