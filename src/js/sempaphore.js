import { Identity } from "@semaphore-protocol/core";
import { Group } from "@semaphore-protocol/group";
import { generateProof, verifyProof } from "@semaphore-protocol/proof";
import { SemaphoreSubgraph } from "@semaphore-protocol/data";
import {
  AbiCoder,
  Contract,
  JsonRpcProvider,
  getBytes,
  toQuantity,
  Wallet,
  keccak256,
  toUtf8Bytes,
} from "ethers";
import { readFileSync } from "fs";

// import { hashScope, hashVote } from "./hasher";

import "dotenv/config";

const sydneyElectorateId = "49";
const electoralCommissionAddress = "0x718b30E214EC24c65A7e78ef605C3b39c72fbb9B";
const sydneyElectorateHash = keccak256(toUtf8Bytes("Sydney"));
const abiEncoder = AbiCoder.defaultAbiCoder();
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

  const randomId = new Identity();
  console.log(`ID from random:`);
  console.log(`Private key: ${randomId.privateKey}`);
  console.log(`Public key: ${randomId.publicKey}`);
  console.log(`Commitment: ${randomId.commitment}`);

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

  console.log("About to add member");
  const tx = await electoralCommission.addMember(
    sydneyElectorateHash,
    randomId.commitment
  );
  console.log(`Member added in tx ${tx.hash}`);
  await tx.wait();

  const pkWallet = new Wallet(
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  );

  const pkId = new Identity(pkWallet.privateKey);
  console.log(`\nID from private key:`);
  console.log(`private key: ${pkId.privateKey}`);
  console.log(`Public key: ${pkId.publicKey}`);
  console.log(`Commitment: ${pkId.commitment}`);

  const signedMessage = await pkWallet.signMessage("0xPoll");
  const sigId = new Identity(signedMessage);
  console.log(`\nID from private key:`);
  console.log(`private key: ${sigId.privateKey}`);
  console.log(`Public key: ${sigId.publicKey}`);
  console.log(`Commitment: ${sigId.commitment}`);

  const group = new Group([pkId.commitment, sigId.commitment]);
  group.addMember(randomId.commitment);

  // get members from chain
  const semaphoreSubgraph = new SemaphoreSubgraph("sepolia");
  const { members } = await semaphoreSubgraph.getGroup(sydneyElectorateId, {
    members: true,
  });
  console.log(`\n${members.length} voters in the Sydney electorate`);

  const sydneyElectorate = new Group(members);

  const scope = hashScope("digital-id-bill-2024");
  const message = hashVote(Vote.Yes);

  console.log(`Generating proof for voter ${randomId.publicKey}`);
  const proof = await generateProof(randomId, sydneyElectorate, message, scope);
  console.log(`Proof generated:`);
  console.log(proof);

  // Verify the proof locally
  console.log(`About to verify the proof locally`);
  await verifyProof(proof);
  console.log(`Verified the proof locally`);

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

const hashScope = (scope) => {
  const hash = keccak256(toUtf8Bytes(scope));
  const field = hash.slice(0, -2);

  console.log(`Hashed scope "${scope}" to field ${field}`);

  return field;
};

const hashVote = (vote) => {
  const hash = keccak256("0x01");
  const field = hash.slice(0, -2);

  console.log(`Hashed vote "${vote}" to field ${field}`);

  return field;
};
