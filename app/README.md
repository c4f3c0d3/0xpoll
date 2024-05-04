# 0xPoll - On-Chain Democracy

Template repository for a World ID On-Chain Integration.

## Local Development

### Local Web Setup

In a new shell, install project dependencies:

```bash
pnpm i
```

Set up your environment variables in the `.env` file. You will need to set the following variables:
- `NEXT_PUBLIC_APP_ID`: The app ID as configured in the [Worldcoin Developer Portal](https://developer.worldcoin.org).
- `NEXT_PUBLIC_ACTION`: The action ID as configured in the Worldcoin Developer Portal.
- `NEXT_PUBLIC_WALLETCONNECT_ID`: Your WalletConnect ID.
- `NEXT_PUBLIC_CONTRACT_ADDRESS`: The address of the deployed contract.

Start the development server:

```bash
pnpm dev
```

The Contract ABI will be automatically re-generated and saved to `src/abi/ContractAbi.json` on each run of `pnpm dev`.

### Testing

Use the [Worldcoin Simulator](https://simulator.worldcoin.org) in place of World App to scan the IDKit QR codes and generate the zero-knowledge proofs.