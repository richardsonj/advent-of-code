const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => {
    let match = line.match(
      /(\w*): capacity ([-+]?\d*), durability ([-+]?\d*), flavor ([-+]?\d*), texture ([-+]?\d*), calories ([-+]?\d*d*)/
    );
    const [junk, name, capacity, durability, flavor, texture, calories] = match;
    return {
      name,
      capacity: parseInt(capacity),
      durability: parseInt(durability),
      flavor: parseInt(flavor),
      texture: parseInt(texture),
      calories: parseInt(calories),
    };
  });
};

const calculateSolution = (ingredients) => {
  let bestScore = assemble(
    ingredients.map((ing) => ing.name),
    {},
    ingredients.reduce((acc, curr) => {
      acc[curr.name] = curr;
      return acc;
    }, {})
  );

  return bestScore;
};

const assemble = (remainingIngredients, ingredientsUsed, ingredientStats) => {
  if (remainingIngredients.length === 1) {
    let ingredientCount = 100 - Object.values(ingredientsUsed).reduce((a, b) => a + b, 0);
    ingredientsUsed[remainingIngredients[0]] = ingredientCount;
    let capacity = 0;
    let durability = 0;
    let flavor = 0;
    let texture = 0;
    for (let ingredient in ingredientsUsed) {
      durability +=
        ingredientsUsed[ingredient] * ingredientStats[ingredient].durability;
      capacity +=
        ingredientsUsed[ingredient] * ingredientStats[ingredient].capacity;
      flavor +=
        ingredientsUsed[ingredient] * ingredientStats[ingredient].flavor;
      texture +=
        ingredientsUsed[ingredient] * ingredientStats[ingredient].texture;
    }
    if (capacity < 0) capacity = 0;
    if (durability < 0) durability = 0;
    if (flavor < 0) flavor = 0;
    if (texture < 0) texture = 0;

    return capacity * durability * flavor * texture;
  }
  let bestScore = 0;
  for (
    let x = 0;
    x <= 100 - Object.values(ingredientsUsed).reduce((a, b) => a + b, 0);
    x++
  ) {
    let nextUsed = { ...ingredientsUsed };
    nextUsed[remainingIngredients[0]] = x;
    bestScore = Math.max(
      bestScore,
      assemble(remainingIngredients.slice(1), nextUsed, ingredientStats)
    );
  }
  return bestScore;
};

export default solution;
