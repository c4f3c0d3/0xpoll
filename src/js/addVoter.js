import { Identity } from "@semaphore-protocol/core";
import { Group } from "@semaphore-protocol/group";
import { generateProof, verifyProof } from "@semaphore-protocol/proof";
import { SemaphoreSubgraph } from "@semaphore-protocol/data";
import {
  Contract,
  JsonRpcProvider,
  Wallet,
  keccak256,
  toUtf8Bytes,
} from "ethers";
import { readFileSync } from "fs";

import { hashScope, hashVote } from "./hasher.js";

import "dotenv/config";

const sydneyElectorateId = "93";
const electoralCommissionAddress = "0xB149F77675e79810971609Fc0b87F6958481F0Cb";
const sydneyElectorateHash = keccak256(toUtf8Bytes("Sydney"));
console.log(`Sydney electorate hash: ${sydneyElectorateHash}`);
const bill = "digital-id-bill-2024";
// Org nullifier
// const voter1Msg =
//   "10275366243953154642524808429964944346675260640541267283304524169466159660523";
const voter1Msg = "voter14";

const Vote = {
  No: 0,
  Yes: 1,
  Abstain: 2,
};

const main = async () => {
  // Load provider
  const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  // Load the signer
  const signer = new Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);

  const voter1 = new Identity(voter1Msg);
  // const voter1 = new Identity();
  console.log(`ID from voter:`);
  console.log(`Private key: ${voter1.privateKey}`);
  console.log(`Public key: ${voter1.publicKey}`);
  console.log(`Commitment: ${voter1.commitment}`);

  // Read the JSON file
  const ecCompilerData = await readFileSync(
    "./out/ElectoralCommission.sol/ElectoralCommission.json",
    { encoding: "utf8" }
  );
  // Parse the JSON data
  const ecABI = JSON.parse(ecCompilerData).abi;

  const electoralCommission = new Contract(
    electoralCommissionAddress,
    ecABI,
    signer
  );

  console.log("About to add members");
  const tx1 = await electoralCommission.addMembers("Sydney", [
    voter1.commitment,
  ]);
  console.log(`Members added in tx ${tx1.hash}`);
  await tx1.wait();

  const randomVoter1 = new Identity();
  const randomVoter2 = new Identity();
  const randomVoter3 = new Identity();
  const randomVoter4 = new Identity();
  const randomVoter5 = new Identity();
  const randomVoter6 = new Identity();
  const randomVoter7 = new Identity();
  const randomVoter8 = new Identity();
  const randomVoter9 = new Identity();
  const randomVoter10 = new Identity();
  const randomVoter11 = new Identity();
  const randomVoter12 = new Identity();

  await electoralCommission.addMembers("Sydney", [
    randomVoter1.commitment,
    randomVoter2.commitment,
    randomVoter3.commitment,
    randomVoter4.commitment,
    randomVoter5.commitment,
    randomVoter6.commitment,
    randomVoter7.commitment,
    randomVoter8.commitment,
    randomVoter9.commitment,
    randomVoter10.commitment,
    randomVoter11.commitment,
    randomVoter12.commitment,
  ]);
};

main()
  .then(() => {
    console.log("All done");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
