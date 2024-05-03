// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import {Poll} from "../src/Poll.sol";

contract DeployPoll is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address deployer = vm.rememberKey(deployerPrivateKey);
        vm.startBroadcast(deployer);
        console.log("Deploying on mainnet with deployer: %s", deployer);

        new Poll(0x42FF98C4E85212a5D31358ACbFe76a621b50fC02, "0xPoll");

        vm.stopBroadcast();
    }
}
