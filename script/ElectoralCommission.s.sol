// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import {Poll} from "src/contracts/Poll.sol";
import {ElectoralCommission} from "src/contracts/ElectoralCommission.sol";

contract DeployElectoralCommission is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address deployer = vm.rememberKey(deployerPrivateKey);
        vm.startBroadcast(deployer);
        console.log("Deploying on mainnet with deployer: %s", deployer);

        // new Poll(
        //     0x42FF98C4E85212a5D31358ACbFe76a621b50fC02,
        //     "app_staging_7820bb0bd1e9e9cdee0441837336351c"
        // );

        ElectoralCommission electoralCommission = new ElectoralCommission(
            0x0A09FB3f63c13F1C54F2fA41AFB1e7a98cffc774
        );
        console.log(
            "Deployed ElectoralCommission to ",
            address(electoralCommission)
        );

        // Electoral Commission sets up the electorates the voters are in
        electoralCommission.createElectorate("Sydney");
        electoralCommission.createElectorate("North Sydney");
        electoralCommission.createElectorate("Wentworth");
        electoralCommission.createElectorate("Kingsford Smith");
        electoralCommission.createElectorate("Barton");
        electoralCommission.createElectorate("Cook");

        vm.stopBroadcast();
    }
}
