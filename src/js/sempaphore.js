import { Identity } from "@semaphore-protocol/core";
import { Group } from "@semaphore-protocol/group";
import { generateProof } from "@semaphore-protocol/proof";
import { Wallet } from "ethers";

const main = async () => {
  const randomId = new Identity();
  console.log(`ID from random:`);
  console.log(`Private key: ${randomId.privateKey}`);
  console.log(`Public key: ${randomId.publicKey}`);
  console.log(`Commitment: ${randomId.commitment}`);

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
};

main();
