# 0xPoll

## Base Sepolia Contract

- OxPoll
- [WorldIDRouter](https://sepolia.basescan.org/address/0x42FF98C4E85212a5D31358ACbFe76a621b50fC02#code)

## Contracts

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

## Deploy

```
RPC_URL=
ETHERSCAN_API_KEY=
forge script script/Poll.s.sol:DeployPoll --rpc-url ${RPC_URL}  --broadcast --etherscan-api-key ${ETHERSCAN_API_KEY} --verify --slow
```
