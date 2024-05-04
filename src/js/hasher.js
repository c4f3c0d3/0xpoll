import { keccak256, toUtf8Bytes, solidityPackedKeccak256 } from "ethers";

export const hashScope = (scope) => {
  const hash = keccak256(toUtf8Bytes(scope));
  const field = hash.slice(0, -2);

  console.log(`Hashed scope "${scope}" to field ${field}`);

  return field;
};

export const hashVote = (vote) => {
  const hash = solidityPackedKeccak256(["uint8"], [vote]);
  const field = hash.slice(0, -2);

  console.log(`Hashed vote "${vote}" to field ${field}`);

  return field;
};
