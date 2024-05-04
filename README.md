# 0xPoll

0xPoll allows an issuer to assign World IDs to groups so they can anonymously vote.
For the hackathon, we used the scenario of the Australian Electoral Commission (AEC) assigning World IDs to electorates so they can anonymously vote on proposed bills to be presented in parliament. This could be applied to other voting groups like DAOs.

## Sepolia Contracts

- ElectoralCommission [0xC0353182AC84ac8CF97e5724fb6964a6FA870CF7](https://sepolia.basescan.org/address/0xC0353182AC84ac8CF97e5724fb6964a6FA870CF7)
- ISemaphore [0x0A09FB3f63c13F1C54F2fA41AFB1e7a98cffc774](https://sepolia.basescan.org/address/0x0A09FB3f63c13F1C54F2fA41AFB1e7a98cffc774)
- WorldIDRouter [0x42FF98C4E85212a5D31358ACbFe76a621b50fC02](https://sepolia.basescan.org/address/0x42FF98C4E85212a5D31358ACbFe76a621b50fC02)

### Install

git clone this repo

```shell
git clone https://github.com/c4f3c0d3/0xpoll
cd 0xpoll
# Copy `.env.example` to `.env` and fill in the environment variables.
cp .env.example .env
```

### Build

```shell
$ forge build
```

## Deploy

```bash
make deploy
```

### Test/run

This script will add voters to an electorate and simulate voters lodging their vote by generating a zero-knowledge proof.

```bash
 node ./src/js/sempaphore.js
```

# Technology Stack

- Solidity for smart contracts
- Foundry (Forge) for building contracts
- Ethers.js for deploying and interacting with contracts
- Semaphore protocol for managing identities, groups and proofs
