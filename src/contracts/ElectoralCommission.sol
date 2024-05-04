// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ByteHasher} from "./ByteHasher.sol";
import {ISemaphore} from "./ISemaphore.sol";

enum Vote {
    No,
    Yes,
    Abstain
}

contract ElectoralCommission is Ownable {
    using ByteHasher for bytes;

    ISemaphore public semaphore;

    mapping(bytes32 => uint256) public electorates;

    event ElectorateCreated(bytes32 electorateHash, uint256 groupId);
    event Voted(bytes32 electorateHash, Vote vote);

    constructor(address _semaphore) Ownable(msg.sender) {
        semaphore = ISemaphore(_semaphore);
    }

    function lodge(
        bytes32 electorateHash,
        string calldata bill,
        Vote vote,
        ISemaphore.SemaphoreProof memory proof
    ) external {
        proof.scope = bytes(bill).hashToField();
        proof.message = abi.encodePacked(vote).hashToField();
        semaphore.validateProof(electorates[electorateHash], proof);

        // TODO add double voting protection

        emit Voted(electorateHash, vote);
    }

    function createElectorate(
        bytes32 electorateHash
    ) external onlyOwner returns (uint256 groupId) {
        require(electorates[electorateHash] == 0, "Electorate already exists");
        groupId = semaphore.createGroup(address(this));
        electorates[electorateHash] = groupId;

        emit ElectorateCreated(electorateHash, groupId);
    }

    function addMember(
        bytes32 electorateHash,
        uint256 identityCommitment
    ) external onlyOwner {
        semaphore.addMember(electorates[electorateHash], identityCommitment);
    }

    function updateMember(
        bytes32 electorateHash,
        uint256 identityCommitment,
        uint256 newIdentityCommitment,
        uint256[] calldata merkleProofSiblings
    ) external onlyOwner {
        semaphore.updateMember(
            electorates[electorateHash],
            identityCommitment,
            newIdentityCommitment,
            merkleProofSiblings
        );
    }

    function removeMember(
        bytes32 electorateHash,
        uint256 identityCommitment,
        uint256[] calldata merkleProofSiblings
    ) external {
        semaphore.removeMember(
            electorates[electorateHash],
            identityCommitment,
            merkleProofSiblings
        );
    }
}
