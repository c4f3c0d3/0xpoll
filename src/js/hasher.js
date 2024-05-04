import { keccak256, toUtf8Bytes } from "ethers";

const hashScope = (scope) => {
  const hash = keccak256(toUtf8Bytes(scope));
  const field = hash.slice(0, -2);

  console.log(`Hashed scope "${scope}" to field ${field}`);

  return field;
};

const hashVote = (vote) => {
  const hash = keccak256(getBytes(toQuantity(vote)));
  const field = hash.slice(0, -2);

  console.log(`Hashed vote "${vote}" to field ${field}`);

  return field;
};
