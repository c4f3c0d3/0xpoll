// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {ByteHasher} from "./ByteHasher.sol";
import {IWorldID} from "./IWorldID.sol";

contract Poll {
    using ByteHasher for bytes;

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    string public appId;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    event Vote(string action, uint256 signal);

    /// @param _worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID app ID
    constructor(address _worldId, string memory _appId) {
        worldId = IWorldID(_worldId);
        appId = _appId;
    }

    function vote(
        string memory _actionId,
        uint256 signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        // First, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        uint256 externalNullifier = abi
            .encodePacked(abi.encodePacked(appId).hashToField(), _actionId)
            .hashToField();

        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;

        emit Vote(_actionId, signal);
    }
}
