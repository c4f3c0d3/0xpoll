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
    event Voted(string electorate, string bill, Vote vote);

    constructor(address _semaphore) Ownable(msg.sender) {
        semaphore = ISemaphore(_semaphore);
    }

    function lodge(
        string calldata electorate,
        string calldata bill,
        Vote vote,
        ISemaphore.SemaphoreProof memory proof
    ) external {
        proof.scope = bytes(bill).hashToField();
        proof.message = abi.encodePacked(vote).hashToField();
        bytes32 electorateHash = keccak256(abi.encodePacked(electorate));
        semaphore.validateProof(electorates[electorateHash], proof);

        emit Voted(electorate, bill, vote);
    }

    function createElectorate(
        string calldata electorate
    ) external onlyOwner returns (uint256 groupId) {
        bytes32 electorateHash = _hashElectorate(electorate);
        require(electorates[electorateHash] == 0, "Electorate already exists");
        groupId = semaphore.createGroup(address(this));
        electorates[electorateHash] = groupId;

        emit ElectorateCreated(electorateHash, groupId);
    }

    function addMember(
        string calldata electorate,
        uint256 identityCommitment
    ) external onlyOwner {
        bytes32 electorateHash = _hashElectorate(electorate);
        semaphore.addMember(electorates[electorateHash], identityCommitment);
    }

    function addMembers(
        string calldata electorate,
        uint256[] calldata identityCommitments
    ) external onlyOwner {
        bytes32 electorateHash = _hashElectorate(electorate);
        semaphore.addMembers(electorates[electorateHash], identityCommitments);
    }

    function updateMember(
        string calldata electorate,
        uint256 identityCommitment,
        uint256 newIdentityCommitment,
        uint256[] calldata merkleProofSiblings
    ) external onlyOwner {
        bytes32 electorateHash = _hashElectorate(electorate);
        semaphore.updateMember(
            electorates[electorateHash],
            identityCommitment,
            newIdentityCommitment,
            merkleProofSiblings
        );
    }

    function removeMember(
        string calldata electorate,
        uint256 identityCommitment,
        uint256[] calldata merkleProofSiblings
    ) external {
        bytes32 electorateHash = _hashElectorate(electorate);
        semaphore.removeMember(
            electorates[electorateHash],
            identityCommitment,
            merkleProofSiblings
        );
    }

    function _hashElectorate(
        string calldata electorate
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(electorate));
    }
}
