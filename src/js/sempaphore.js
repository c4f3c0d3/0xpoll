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

const sydneyElectorateId = "55";
const electoralCommissionAddress = "0xC0353182AC84ac8CF97e5724fb6964a6FA870CF7";
const sydneyElectorateHash = keccak256(toUtf8Bytes("Sydney"));
const bill = "digital-id-bill-2024";

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

  const voter1 = new Identity();
  console.log(`ID from vote1:`);
  console.log(`Private key: ${voter1.privateKey}`);
  console.log(`Public key: ${voter1.publicKey}`);
  console.log(`Commitment: ${voter1.commitment}`);
  const voter2 = new Identity();

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
  const tx1 = await electoralCommission.addMembers(sydneyElectorateHash, [
    voter1.commitment,
    voter2.commitment,
  ]);
  console.log(`Members added in tx ${tx1.hash}`);
  await tx1.wait();

  // get members from chain
  const semaphoreSubgraph = new SemaphoreSubgraph("sepolia");
  const { members } = await semaphoreSubgraph.getGroup(sydneyElectorateId, {
    members: true,
  });
  console.log(`\n${members.length} voters in the Sydney electorate`);

  const sydneyElectorate = new Group(members);

  const scope = hashScope("digital-id-bill-2024");
  const message = hashVote(Vote.Yes);

  console.log(`Generating proof for voter ${voter1.publicKey}`);
  let startTime = performance.now();
  const proof = await generateProof(voter1, sydneyElectorate, message, scope);
  let endTime = performance.now();
  console.log(`Proof generated in ${endTime - startTime} milliseconds`);
  console.log(proof);

  // Verify the proof locally
  console.log(`About to verify the proof locally`);
  startTime = performance.now();
  await verifyProof(proof);
  endTime = performance.now();
  console.log(
    `Verified the proof locally in ${endTime - startTime} milliseconds`
  );

  // lodge vote on-chain
  const lodgeTx = await electoralCommission.lodge(
    sydneyElectorateHash,
    bill,
    Vote.Yes,
    proof
  );
  console.log(`Vote lodged in tx ${lodgeTx.hash}`);
  await lodgeTx.wait();
};

main()
  .then(() => {
    console.log("All done");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
