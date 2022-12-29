const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) => input.split("\n");

const calculateSolution = (input) => {
  let total = 0;
  for (const number of input) {
    total += UFANS(number);
  }
  return SNAFU(total)
    .map((digit) => {
      switch (digit) {
        case -2:
          return "=";
        case -1:
          return "-";
        default:
          return digit.toString();
      }
    })
    .join("");
};

const UFANS = (number) => {
  const digits = number.split("");
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    const digit = number[digits.length - 1 - i];
    let value;
    switch (digit) {
      case "0":
      case "1":
      case "2":
        value = parseInt(digit);
        break;
      case "-":
        value = -1;
        break;
      case "=":
        value = -2;
        break;
    }
    sum += value * 5 ** i;
  }
  return sum;
};

const SNAFU = (target, maxDigits = Infinity) => {
  if (maxDigits === 0) {
    return [target];
  }
  let value = 0;
  let i = maxDigits < Infinity ? maxDigits : 0;
  while (value < target) {
    for (const digit of [1, 2]) {
      value = digit * 5 ** i;
      if (value > target) {
        const prevValue = (digit - 1) * 5 ** i;
        const correctDigit =
          Math.abs(target - prevValue) < Math.abs(target - value) ? digit - 1 : digit;
        const remaining = target - correctDigit * 5 ** i;
        const remainingDigits = SNAFU(Math.abs(remaining), i - 1);
        return [
          correctDigit,
          ...(remaining && remaining > 0
            ? remainingDigits
            : remainingDigits.map((remainingDigit) => remainingDigit * -1)),
        ];
      }
    }
    if (i === maxDigits) {
      const correctDigit = 2;
      const remaining = target - correctDigit * 5 ** i;
      const remainingDigits = SNAFU(Math.abs(remaining), i - 1);
      return [
        correctDigit,
        ...(remaining && remaining > 0
          ? remainingDigits
          : remainingDigits.map((remainingDigit) => remainingDigit * -1)),
      ];
    }
    i++;
  }
  return undefined;
};

export default solution;
