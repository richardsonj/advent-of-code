const day16_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  let binary = "";
  for (let chr of input) {
    binary += parseInt(chr, 16).toString(2).padStart(4, "0");
  }
  return binary.split("");
};

const calculateSolution = (binary) => {
  let total = 0;
  let version = parsePacket(binary);
  total += version;

  return version;
};

const parseNumber = (bits, count) => {
  let numberBits = bits.splice(0, count);
  let number = parseInt(numberBits.join(""), 2);
  return number;
};

const parseLiteral = (bits) => {
  let result = "";
  let numberBits;
  let firstBit;
  do {
    numberBits = bits.splice(0, 5);
    firstBit = numberBits.splice(0, 1);
    result += numberBits.join("");
  } while (firstBit[0] === "1");

  return [parseInt(result, 2)];
};

const parseOperator = (bits) => {
  let versionSum = 0;
  let lengthTypeId = bits.splice(0, 1)[0];
  let packet = [];
  if (lengthTypeId === "0") {
    let length = parseInt(bits.splice(0, 15).join(""), 2);
    let targetBitCount = bits.length - length;
    while (bits.length > targetBitCount) {
      let [subPacket, subPacketVersionSum] = parsePacket(bits);
      packet.push(subPacket);
      versionSum += subPacketVersionSum;
    }
  } else {
    let subPacketCount = parseInt(bits.splice(0,11).join(""), 2);
    for (let x=0; x < subPacketCount; x++) {
      let [subPacket, subPacketVersionSum] = parsePacket(bits);
      packet.push(subPacket);
      versionSum += subPacketVersionSum;
    }
  }
  return [packet, versionSum];
};

function parsePacket(binary) {
  let version = parseNumber(binary, 3);
  let type = parseNumber(binary, 3);
  let packet;
  let versionSum = 0;
  switch (type) {
    case 4:
      packet = parseLiteral(binary);
      break;
    default:
      [packet, versionSum] = parseOperator(binary);
      break;
  }
  return [[type, packet], version + versionSum];
}

export default day16_1;
