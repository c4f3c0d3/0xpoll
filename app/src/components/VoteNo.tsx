import { useEffect } from 'react';
import { useAccount, useContract, useSigner, useWriteContract } from 'wagmi';
import { Contract } from 'ethers';
import { Identity, Group } from '@semaphore-protocol/core';
import { generateProof, verifyProof } from '@semaphore-protocol/proof';
import { SemaphoreSubgraph } from "@semaphore-protocol/data";
// We need to replace this.
//import { keccak256, toUtf8Bytes } from 'ethers/lib/utils';
import LodgeVoteABI from '../abi/LodgeVoteAbi.json';

const electoralCommissionAddress = '0xC0353182AC84ac8CF97e5724fb6964a6FA870CF7';
// TODO Find alternative functions with wagmi 
//const sydneyElectorateHash = keccak256(toUtf8Bytes('Sydney'));
const sydneyElectorateHash = '0x69ed05f70d319c41baeb11c96a47ecd6e07585e86bc770c7486cfd600b0c4c3a';
const bill = 'digital-id-bill-2024';
const sydneyElectorateId = '55';

export default function VoteButton() {
  const { isConnected, address } = useAccount();

  const { writeContract } = useWriteContract();

  const handleVote = async () => {
    if (!isConnected) {
      alert('Please connect your wallet');
      return;
    }

    const voter = new Identity('voter1');
    console.log(`Voter Public Key: ${voter.publicKey}`);


    // get members from chain
    const semaphoreSubgraph = new SemaphoreSubgraph("sepolia");
    const { members } = await semaphoreSubgraph.getGroup(sydneyElectorateId, {
      members: true,
    });

    // Uses subgraph
    const sydneyElectorate = new Group(members);
    // TODO Replace with hashing versions.
    const scope = '0xdee2ea8b1704b566fc257124630122e6b788a735c8c85de5e0d00f07492376';
    const message = '0x5fe7f977e71dba2ea1a68e21057beebb9be2ac30c6410aa38d4f3fbe41dcff'; 


    const proof = await generateProof(voter, sydneyElectorate, message, scope);
    console.log(proof);
    const result = await writeContract({ 
          abi: LodgeVoteABI,
          address: electoralCommissionAddress,
          functionName: 'lodge',
          args: [
            sydneyElectorateHash,
            bill,
            0, // Vote enum
            proof
          ],
       })
    console.log(result);
      
  };

  return (
    <button onClick={handleVote} disabled={!isConnected}>
      Vote No
    </button>
  );
}
