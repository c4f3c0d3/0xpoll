# include .env file and export its env vars
# (-include to ignore error if it does not exist)
# Note that any unset variables here will wipe the variables if they are set in
# .zshrc or .bashrc. Make sure that the variables are set in .env, especially if
# you're running into issues with fork tests
-include .env

all: install build
# Install forge dependencies (not needed if submodules are already initialized).
install:; forge install && npm install

# Build contracts and inject the Poseidon library.
# build:; forge build && node ./src/test/scripts/generate-circom-lib.js
build:; forge build

# Run tests, with debug information and gas reports.
test:; forge test -vv --gas-report

# Update forge dependencies.
update:; forge update

# Deploy contracts
deploy:; forge script script/Poll.s.sol:DeployPoll --rpc-url ${RPC_URL}  --broadcast --etherscan-api-key ${ETHERSCAN_API_KEY} --verify --slow
